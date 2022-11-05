import { useEffect } from 'react'
import { useState, lazy, Suspense } from 'react'
import './App.css'
import GarbageForm from './components/GarbageForm'
import LoadingPage from './components/LoadingPage'
const GarbageCenterListPage = lazy(() => import('./components/GarbageCenterListPage.jsx'))
import { getCategories, getGarbageCenterList } from './API'

function App() {

  const geoLoc = { lat: '60.184737', lon: '24.833727' } // our location

  const [formData, setFormData] = useState(null)
  const [garbageCategories, setGarbageCategories] = useState([])
  const [orderSuccessUrl, setOrderSuccessUrl] = useState('')

  useEffect(() => {
    const getCats = async function () {
      const categories = await getCategories()
      setGarbageCategories(categories)
    }
    getCats()
  }, [])

  // objects with the same fields as GarbageCenterCard (except no handleClick method)
  const [garbageCenters, setGarbageCenters] = useState([])

  // For testing the GarbageCenterList; do not delete (yet)
  /*
  const [garbageCenters, setGarbageCenters] = useState([{ id: '1', name: 'Garbage Center X', address: 'Hell Street 666', price: '66', eta: '6 h' }, { id: '2', name: 'Garbage Center Y', address: 'Paradise Street 777', price: '77', eta: '7 h' }]) */

  const handleFormSubmit = (data) => {

    setFormData(data)
    console.log('Form data: ' + data)
  }

  useEffect(() => {
    const requestDelivery = async function () {
      if (formData != null) {
        const response = await getGarbageCenterList(formData)
        setGarbageCenters(response)
      }
    }
    requestDelivery()
  }, [formData])

  return (
    <div className="App bg-gray-200 w-full">
      {formData
        ? (<Suspense fallback={<LoadingPage />}>
          <GarbageCenterListPage geoLoc={geoLoc} onSubmit={deliverToSelectedGarbageCenter}>{garbageCenters}</GarbageCenterListPage>
        </Suspense>)
        : <GarbageForm categories={garbageCategories} onSubmit={handleFormSubmit} />
      }
    </div>
  )
}

export default App
