import { useState, lazy, Suspense } from 'react'
import './App.css'
import GarbageForm from './components/GarbageForm'
import LoadingPage from './components/LoadingPage';
const GarbageCenterList = lazy(() => import('./components/GarbageCenterList.jsx'));

function App() {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [garbageCenters, setGarbageCenters] = useState([])

  /* For testing the GarbageCenterList; do not delete (yet)
  const [garbageCenters, setGarbageCenters] = useState([{ name: 'Garbage Center X', address: 'Hell Street 666', price: '66', eta: '6 h', handleClick: null }]) */

  const handleFormSubmit = () => {

    // TODO: add this as a prop for the GarbageForm; make the backend request; 
    // call setGarbageCenters() with the result
  }

  return (
    <div className="App">
      {formSubmitted
        ? (<Suspense fallback={<LoadingPage />}>
          <GarbageCenterList>{garbageCenters}</GarbageCenterList>
        </Suspense>)
        : <GarbageForm />
      }
    </div>
  )
}

export default App
