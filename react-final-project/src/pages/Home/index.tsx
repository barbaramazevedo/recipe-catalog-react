import { useCallback } from 'react'
import styled from 'styled-components'
import { useRecipes } from '../../hooks/useRecipes'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import SearchBar from '../../components/SearchBar'

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
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

const Empty = styled.p`
  text-align: center;
  color: #888;
  margin-top: 40px;
`

export default function Home() {
  const {
    recipes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    search,
    fetchRandom,
  } = useRecipes()

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      const controller = new AbortController()
      fetchRandom(controller.signal)
      return
    }
    const controller = new AbortController()
    search(searchQuery.trim(), controller.signal)
  }, [searchQuery, search, fetchRandom])

  function handleRefresh() {
    setSearchQuery('')
    sessionStorage.removeItem('home_meals')
    const controller = new AbortController()
    fetchRandom(controller.signal)
  }

  return (
    <Wrapper>
      <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />

      <Toolbar>
        <RefreshButton onClick={handleRefresh} disabled={loading}>
          {loading ? 'Loading...' : 'Try new recipes'}
        </RefreshButton>
      </Toolbar>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && recipes.length === 0 && (
        <Empty>No recipes found.</Empty>
      )}

      {!loading && !error && recipes.length > 0 && (
        <Grid>
          {recipes.map(meal => (
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
