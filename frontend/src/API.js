
const BASE_URL = 'https://localhost:3000/'

export async function getCategories() {

  try {
    const response = await fetch(`${BASE_URL} + categories`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}