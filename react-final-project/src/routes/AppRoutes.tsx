import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RecipeDetails from '../pages/RecipeDetails'
import Favorites from '../pages/Favorites'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}
