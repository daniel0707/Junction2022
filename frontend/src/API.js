// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'https://junction-hack22esp-7014.ey.r.appspot.com/'

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

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: gcId, geoLoc: ourGeoLoc })
  }

  try {
    const response = await fetch(`${BASE_URL}` + 'order/submit', options)
    const json = await response.json()
    return json.url
  } catch (error) {
    console.log(error)
  }
}