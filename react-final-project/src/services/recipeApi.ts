const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  [key: string]: string | null
}

export interface MealsResponse {
  meals: Meal[] | null
}

export async function getRandomMeals(count = 12, signal?: AbortSignal): Promise<Meal[]> {
  const requests = Array.from({ length: count }, () =>
    fetch(`${BASE_URL}/random.php`, { signal }).then(r => r.json() as Promise<MealsResponse>)
  )
  const results = await Promise.all(requests)
  return results.flatMap(data => data.meals ?? [])
}

export async function getMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data: MealsResponse = await res.json()
  return data.meals ? data.meals[0] : null
}
