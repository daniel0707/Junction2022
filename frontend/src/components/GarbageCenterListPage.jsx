import { useState } from "react"
import GarbageCenterCard from "./GarbageCenterCard"

export default function GarbageCenterListPage(props) {

  const [selectedCardId, setSelectedCardId] = useState(null)

  const handleCardClick = (id) => {

    setSelectedCardId(id)
  }

  const sendDeliveryRequest = () => {

    const ourGeoLoc = props.geoLoc
    // TODO: use ourGeoLoc and selectedCardId to make the backend request
  }

  const submitButtonStyle = selectedCardId ? 'bg-sky-200 text-sky-600' : 'bg-gray-300 text-gray-400'

  return (
    <div>
      <h1 className="text-2xl mb-8 bg-sky-200 p-4 rounded-lg m-auto mt-6 w-fit text-sky-600">Click on a garbage center to select it</h1>
      <div className="bg-gray-200 p-2 columns-2 flex w-screen justify-center">
        <div className="h-full grow max-w-sm">
          {props.children.map(gc => {
            return <GarbageCenterCard
              key={gc.id}
              name={gc.name}
              address={gc.address}
              deliveryPrice={gc.price}
              eta={gc.eta}
              selected={selectedCardId === gc.id ? true : false}
              handleClick={() => handleCardClick(gc.id)}
            />
          })}
        </div>
        <div className="w-fit grow-0">
          <button type="submit" className={`${submitButtonStyle} w-fit`} onClick={sendDeliveryRequest}>Request Delivery</button>
        </div>
      </div>
    </div>
  )
}