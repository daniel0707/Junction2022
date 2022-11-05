const BASE_URL = 'http://localhost:3000/'

export async function getCategories() {

  try {
    const response = await fetch(`${BASE_URL}` + 'categories')
    const json = await response.json()
    console.log(json)
    return json.categories
  } catch (error) {
    console.log(error.message)
  }
}

export async function getGarbageCenterList(data) {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch(`${BASE_URL}` + 'order/find', options)
    const json = await response.json()
    return json.result
  } catch (error) {
    console.log(error)
  }
}

export async function deliverToGarbageCenter(gcId, ourGeoLoc) {

  try {
    const response = await fetch(`${BASE_URL}` + 'deliver')
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}