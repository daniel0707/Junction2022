import { useState, lazy, Suspense } from 'react'
import './App.css'
import GarbageForm from './components/GarbageForm'
import LoadingPage from './components/LoadingPage'
const GarbageCenterListPage = lazy(() => import('./components/GarbageCenterListPage.jsx'))

function App() {

  const geoLoc = { lat: '', lon: '' } // our location

  const [formSubmitted, setFormSubmitted] = useState(false)

  // objects with the same fields as GarbageCenterCard (except no handleClick method)
  const [garbageCenters, setGarbageCenters] = useState([])

  // For testing the GarbageCenterList; do not delete (yet)
  /*
  const [garbageCenters, setGarbageCenters] = useState([{ id: '1', name: 'Garbage Center X', address: 'Hell Street 666', price: '66', eta: '6 h' }, { id: '2', name: 'Garbage Center Y', address: 'Paradise Street 777', price: '77', eta: '7 h' }]) */

  const handleFormSubmit = () => {

    // TODO: add this as a prop for the GarbageForm; make the backend request; 
    // call setGarbageCenters() with the result
  }

  return (
    <div className="App bg-gray-200 w-full">
      {formSubmitted
        ? (<Suspense fallback={<LoadingPage />}>
          <GarbageCenterListPage geoLoc={geoLoc}>{garbageCenters}</GarbageCenterListPage>
        </Suspense>)
        : <GarbageForm />
      }
    </div>
  )
}

export default App
