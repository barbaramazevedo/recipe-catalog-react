import type { Meal } from '../services/recipeApi'
import {
  SET_RECIPES,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCH_QUERY,
  SET_CATEGORY_FILTER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from './actions'
import type { RecipeAction } from './actions'

const FAVORITES_KEY = 'favorites'

function loadFavorites(): Meal[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export interface RecipeState {
  recipes: Meal[]
  loading: boolean
  error: string | null
  searchQuery: string
  categoryFilter: string
  favorites: Meal[]
}

export const initialState: RecipeState = {
  recipes: [],
  loading: true,
  error: null,
  searchQuery: '',
  categoryFilter: '',
  favorites: loadFavorites(),
}

export function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.payload }

    case SET_LOADING:
      return { ...state, loading: action.payload }

    case SET_ERROR:
      return { ...state, error: action.payload }

    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }

    case SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload }

    case ADD_FAVORITE: {
      if (state.favorites.some(m => m.idMeal === action.payload.idMeal)) return state
      const updated = [...state.favorites, action.payload]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      return { ...state, favorites: updated }
    }

    case REMOVE_FAVORITE: {
      const updated = state.favorites.filter(m => m.idMeal !== action.payload)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      return { ...state, favorites: updated }
    }

    default:
      return state
  }
}
