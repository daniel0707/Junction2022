import { useState } from 'react'
import './App.css'
import GarbageCenterList from './components/GarbageCenterList'
import GarbageForm from './components/GarbageForm'

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
        ? <GarbageCenterList>{garbageCenters}</GarbageCenterList>
        : <GarbageForm />
      }
    </div>
  )
}

export default App
