import type { Meal } from '../services/recipeApi'

export const SET_RECIPES = 'SET_RECIPES'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export type RecipeAction =
  | { type: typeof SET_RECIPES; payload: Meal[] }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_ERROR; payload: string | null }
  | { type: typeof SET_SEARCH_QUERY; payload: string }
  | { type: typeof SET_CATEGORY_FILTER; payload: string }
  | { type: typeof ADD_FAVORITE; payload: Meal }
  | { type: typeof REMOVE_FAVORITE; payload: string }
