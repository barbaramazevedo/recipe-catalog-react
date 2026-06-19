import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0 0 24px;
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

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <Wrapper>
      <Title>My Favorites</Title>
      {favorites.length === 0 ? (
        <Empty>You haven't saved any recipes yet.</Empty>
      ) : (
        <Grid>
          {favorites.map(meal => (
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
