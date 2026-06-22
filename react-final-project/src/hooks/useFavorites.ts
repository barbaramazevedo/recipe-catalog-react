import { useRecipeContext } from '../context/RecipeContext'
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../context/actions'
import type { Meal } from '../services/recipeApi'

export function useFavorites() {
  const { state, dispatch } = useRecipeContext()

  function addFavorite(meal: Meal) {
    dispatch({ type: ADD_FAVORITE, payload: meal })
  }

  function removeFavorite(id: string) {
    dispatch({ type: REMOVE_FAVORITE, payload: id })
  }

  function isFavorite(id: string): boolean {
    return state.favorites.some(m => m.idMeal === id)
  }

  return { favorites: state.favorites, addFavorite, removeFavorite, isFavorite }
}
