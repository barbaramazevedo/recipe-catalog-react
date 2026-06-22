import { useCallback, useEffect } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import {
  SET_RECIPES,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCH_QUERY,
  SET_CATEGORY_FILTER,
} from '../context/actions'
import { getRandomMeals, searchMealsByName } from '../services/recipeApi'

const CACHE_KEY = 'home_meals'

export function useRecipes() {
  const { state, dispatch } = useRecipeContext()

  const fetchRandom = useCallback((signal?: AbortSignal) => {
    dispatch({ type: SET_LOADING, payload: true })
    dispatch({ type: SET_ERROR, payload: null })
    getRandomMeals(12, signal)
      .then(results => {
        const unique = results.filter(
          (meal, i, arr) => arr.findIndex(m => m.idMeal === meal.idMeal) === i
        )
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(unique))
        dispatch({ type: SET_RECIPES, payload: unique })
      })
      .catch(err => {
        if (err.name !== 'AbortError')
          dispatch({ type: SET_ERROR, payload: 'The recipes could not be loaded.' })
      })
      .finally(() => dispatch({ type: SET_LOADING, payload: false }))
  }, [dispatch])

  const search = useCallback((query: string, signal?: AbortSignal) => {
    dispatch({ type: SET_LOADING, payload: true })
    dispatch({ type: SET_ERROR, payload: null })
    searchMealsByName(query, signal)
      .then(results => dispatch({ type: SET_RECIPES, payload: results }))
      .catch(err => {
        if (err.name !== 'AbortError')
          dispatch({ type: SET_ERROR, payload: 'Search failed.' })
      })
      .finally(() => dispatch({ type: SET_LOADING, payload: false }))
  }, [dispatch])

  function setSearchQuery(query: string) {
    dispatch({ type: SET_SEARCH_QUERY, payload: query })
  }

  function setCategoryFilter(category: string) {
    dispatch({ type: SET_CATEGORY_FILTER, payload: category })
  }

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      dispatch({ type: SET_RECIPES, payload: JSON.parse(cached) })
      dispatch({ type: SET_LOADING, payload: false })
      return
    }
    const controller = new AbortController()
    fetchRandom(controller.signal)
    return () => controller.abort()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    recipes: state.recipes,
    loading: state.loading,
    error: state.error,
    searchQuery: state.searchQuery,
    categoryFilter: state.categoryFilter,
    fetchRandom,
    search,
    setSearchQuery,
    setCategoryFilter,
  }
}
