import { useState } from 'react'
import './App.css'
import GarbageCenterList from './components/GarbageCenterList'
import GarbageForm from './components/GarbageForm'

function App() {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [garbageCenters, setGarbageCenters] = useState([])

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
