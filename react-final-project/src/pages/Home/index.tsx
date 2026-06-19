import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { getRandomMeals } from '../../services/recipeApi'
import type { Meal } from '../../services/recipeApi'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const RefreshButton = styled.button`
  padding: 10px 20px;
  background: #e67e22;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: #cf6d17; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`

const Card = styled.a`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover { transform: translateY(-4px); }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  p {
    padding: 10px 12px;
    margin: 0;
    font-weight: 600;
    font-size: 0.95rem;
  }
`

const CACHE_KEY = 'home_meals'

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMeals = useCallback((signal: AbortSignal) => {
    setLoading(true)
    setError(null)
    getRandomMeals(12, signal)
      .then(results => {
        const unique = results.filter(
          (meal, i, arr) => arr.findIndex(m => m.idMeal === meal.idMeal) === i
        )
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(unique))
        setMeals(unique)
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError('The recipes could not be loaded.')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      setMeals(JSON.parse(cached))
      return
    }
    const controller = new AbortController()
    fetchMeals(controller.signal)
    return () => controller.abort()
  }, [fetchMeals])

  function handleRefresh() {
    sessionStorage.removeItem(CACHE_KEY)
    const controller = new AbortController()
    fetchMeals(controller.signal)
  }

  return (
    <Wrapper>
      <Header>
        <RefreshButton onClick={handleRefresh} disabled={loading}>
          {loading ? 'Loading...' : 'Try new recipes'}
        </RefreshButton>
      </Header>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <Grid>
          {meals.map(meal => (
            <Card key={meal.idMeal} href={`/recipe/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </Card>
          ))}
        </Grid>
      )}
    </Wrapper>
  )
}
