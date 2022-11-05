
const BASE_URL = 'https://localhost:3000/'

export async function getCategories() {

  try {
    const response = await fetch(`${BASE_URL} + categories`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getGarbageCenterList(formData) {

  try {
    const response = await fetch(`${BASE_URL} + garbage_centers`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function deliverToGarbageCenter(gcId, ourGeoLoc) {

  try {
    const response = await fetch(`${BASE_URL} + deliver`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}