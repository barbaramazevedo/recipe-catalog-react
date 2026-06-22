import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites'
import type { Meal } from '../../services/recipeApi'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 180px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FavBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: transform 0.15s;

  &:hover { transform: scale(1.15); }
`

const Body = styled.div`
  padding: 14px 16px 16px;
`

const Category = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 4px 0 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const DetailLink = styled(Link)`
  display: inline-block;
  padding: 8px 18px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

interface RecipeCardProps {
  meal: Meal
}

export default function RecipeCard({ meal }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const active = isFavorite(meal.idMeal)

  function handleFav(e: React.MouseEvent) {
    e.preventDefault()
    if (active) removeFavorite(meal.idMeal)
    else addFavorite(meal)
  }

  return (
    <Card>
      <ImageWrapper>
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
        <FavBtn onClick={handleFav} aria-label="Toggle favorite">
          {active ? '⭐' : '☆'}
        </FavBtn>
      </ImageWrapper>
      <Body>
        <Category>{meal.strCategory}</Category>
        <Title>{meal.strMeal}</Title>
        <DetailLink to={`/recipe/${meal.idMeal}`}>View recipe</DetailLink>
      </Body>
    </Card>
  )
}
