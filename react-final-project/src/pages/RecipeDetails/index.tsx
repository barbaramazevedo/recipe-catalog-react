import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getMealById } from '../../services/recipeApi'
import type { Meal } from '../../services/recipeApi'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import FavoriteButton from '../../components/FavoriteButton'

const Wrapper = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #e67e22;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;

  &:hover { text-decoration: underline; }
`

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0 0 8px;
`

const Meta = styled.p`
  color: #888;
  margin: 0 0 24px;
  font-size: 0.9rem;
`

const Section = styled.section`
  margin-bottom: 28px;

  h2 {
    font-size: 1.2rem;
    margin: 0 0 12px;
    border-bottom: 2px solid #e67e22;
    padding-bottom: 4px;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    line-height: 1.8;
  }

  p {
    line-height: 1.7;
    white-space: pre-line;
  }
`

function getIngredients(meal: Meal): string[] {
  const ingredients: string[] = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim() ?? ''} ${ingredient.trim()}`.trim())
    }
  }
  return ingredients
}

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getMealById(id)
      .then(data => {
        if (!data) setError('Recipe not found.')
        else setMeal(data)
      })
      .catch(() => setError('The recipe could not be loaded.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Wrapper><Loading /></Wrapper>
  if (error) return <Wrapper><ErrorMessage message={error} /></Wrapper>
  if (!meal) return null

  return (
    <Wrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Image src={meal.strMealThumb} alt={meal.strMeal} />
      <Title>{meal.strMeal}</Title>
      <Meta>{meal.strCategory} · {meal.strArea}</Meta>
      <FavoriteButton meal={meal} />

      <Section>
        <h2>Ingredients</h2>
        <ul>
          {getIngredients(meal).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2>Preparation Method</h2>
        <p>{meal.strInstructions}</p>
      </Section>

      {meal.strYoutube && (
        <Section>
          <h2>Video tutorial</h2>
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </Section>
      )}
    </Wrapper>
  )
}
