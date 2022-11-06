import { useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

const baseurl = "https://junction-hack22esp-7014.ey.r.appspot.com/"

export default function GarbageForm({ categories, onSubmit }) {

  function MyComponent({ updateAddress, coord, updateCoord }) {
    const map = useMapEvents({
      click: (e) => {
        updateCoord(e.latlng);
        console.log(e.latlng);
        const coord = e.latlng
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(baseurl + "gmapproxy/reversegeocode", { body: JSON.stringify({ coord }), method: 'POST', headers: myHeaders })
          .then(response => {
            response.json().then(data => {
              console.log(data)
              updateAddress(data.address)
            })
          })
          .catch(error => console.log('error', error));
      }
    })
    return coord ? <Marker position={coord} /> : null;
  }

  function SorttiStation({ selected, stationData, handleSelect }) {
    const handleClick = () => {
      handleSelect(stationData.id)
    }

    const borderStyle = selected ? 'border-sky-400' : 'border-gray-400'
    const infoBallStyle = selected ? 'bg-sky-400' : 'bg-gray-400'

    return (
      <div className={`my-1 mt-4 bg-white text-black flex-row flex justify-between rounded-lg border-4 p-3 ${borderStyle}`} onClick={handleClick}>
        <div className="flex flex-col">
          <div className="flex flew-row place-items-center">
            <div className={`rounded-full w-4 h-4 mr-2 ${infoBallStyle}`}></div>
            <p className="mb-2 text-xl pt-2">{stationData.spot_name}</p>
          </div>
          <p className="text-start ml-6">{stationData.address}</p>
        </div>
        <div className="mt-1">
          <div className="mb-2">{`${stationData.fee.amount} ${stationData.fee.currency}`}</div>
          <div>{`${stationData.distance.toFixed(2)} km`}</div>
        </div>
      </div>
    )
  }

  const [coord, updateCoord] = useState(null);
  const [address, setAddress] = useState('');
  const [selecteedCategories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [selecteedStation, setStation] = useState(null);
  const [stations, setStations] = useState([]);
  //let stations = [];

  const updateAddress = (newAddreess) => {
    setStation(null)
    setStations([])
    setAddress(newAddreess);
  }

  const handleAddreessChange = (event) => {
    setAddress(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setCategories(event.target.value)
    console.log(event.target.value)
  }

  // console.log(watch("example")); // watch input value by passing the name of it

  let marker = null

  const getWastePoints = () => {
    console.log('Start request')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(baseurl + "order/find", {
      body: JSON.stringify({
        materials: selecteedCategories,
        coordinates: coord,
        address: address
      }), method: 'POST', headers: myHeaders
    })
      .then(response => {
        response.json().then(data => {
          console.log('Server response', data)
          setStation(null);
          setStations(data.result)
        })
      })
      .catch(error => console.log('error', error));

    console.log('post')
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(baseurl + "order/submit", {
      body: JSON.stringify({
        dropoff: selecteedStation,
        pickup: {
          location: {
            formatted_address: address
          }
        },
        contents: [
          {
            count: 1,
            description: description,
            identifier: selecteedCategories,
            tags: ['alcohol']
          }
        ]
      }), method: 'POST', headers: myHeaders
    })
      .then(response => {
        response.text().then(data => {
          window.open(data, '_self')
        })
      })
      .catch(error => console.log('error', error));
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form className="grid gap-6 mb-6 md:grid-cols-1 w-full">

        <MapContainer center={[60.1699, 24.9384]} zoom={13} scrollWheelZoom={false} style={{ height: 300 + 'px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent updateAddress={updateAddress} coord={coord} updateCoord={updateCoord} />
          {marker}
        </MapContainer>


        {/* register your input into the hook by invoking the "register" function */}

        <div className="grid">
          <label htmlFor="address" className=" text-left w-full block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Address:</label>
          <input type="text" className="pl-1 w-full border-gray-400 border-2 rounded-md" id="address" placeholder="Select a point on the map" disabled value={address} onChange={handleAddreessChange} />
        </div>

        <div>
          <label htmlFor="garbage_type" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">Garbage type:</label>
          <select defaultValue={selecteedCategories} onInput={handleCategoryChange} id="garbage_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {categories.map(item => {
              return <option key={item.id} value={item.id}>{item.name_en}</option>
            })}
          </select>
        </div>

        <div className="grid items-center justify-center text-start">
          <label className="text-gray-900">Items description</label>
          <textarea onChange={handleDescription} className="pl-1 border-gray-400 border-2 rounded-md" style={{ resize: 'none ' }} id="item_size" name="item_size" rows="4" cols="50" placeholder={'Describe the waste'}>{description}</textarea>
        </div>
      </form>
      <button onClick={getWastePoints} className="w-2/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
      {stations.map(s => <SorttiStation key={s.id} selected={s.id === selecteedStation} handleSelect={setStation} stationData={s} />)}
      {selecteedStation ? <button className="mt-4" onClick={handleSubmit}>Submit</button> : null}
    </div>
  )
}