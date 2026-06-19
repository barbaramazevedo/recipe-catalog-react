import { useState } from 'react'
import type { Meal } from '../services/recipeApi'

const STORAGE_KEY = 'favorites'

function loadFromStorage(): Meal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(meals: Meal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Meal[]>(loadFromStorage)

  function addFavorite(meal: Meal) {
    setFavorites(prev => {
      if (prev.some(m => m.idMeal === meal.idMeal)) return prev
      const updated = [...prev, meal]
      saveToStorage(updated)
      return updated
    })
  }

  function removeFavorite(id: string) {
    setFavorites(prev => {
      const updated = prev.filter(m => m.idMeal !== id)
      saveToStorage(updated)
      return updated
    })
  }

  function isFavorite(id: string): boolean {
    return favorites.some(m => m.idMeal === id)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
