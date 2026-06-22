import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'
import { recipeReducer, initialState } from './RecipeReducer'
import type { RecipeState } from './RecipeReducer'
import type { RecipeAction } from './actions'

interface RecipeContextValue {
  state: RecipeState
  dispatch: Dispatch<RecipeAction>
}

const RecipeContext = createContext<RecipeContextValue | null>(null)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState)

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipeContext(): RecipeContextValue {
  const ctx = useContext(RecipeContext)
  if (!ctx) throw new Error('useRecipeContext must be used inside RecipeProvider')
  return ctx
}
