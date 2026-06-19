import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'
import type { Meal } from '../../services/recipeApi'

const Button = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: 2px solid #e67e22;
  background: ${({ $active }) => ($active ? '#e67e22' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#e67e22')};
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #e67e22;
    color: #fff;
  }
`

interface FavoriteButtonProps {
  meal: Meal
}

export default function FavoriteButton({ meal }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const active = isFavorite(meal.idMeal)

  function handleClick() {
    if (active) removeFavorite(meal.idMeal)
    else addFavorite(meal)
  }

  return (
    <Button $active={active} onClick={handleClick}>
      {active ? '★ Saved' : '☆ Save'}
    </Button>
  )
}
