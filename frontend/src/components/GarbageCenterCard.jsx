import Divider from "./Divider"
import { useRef } from "react"

export default function GarbageCenterCard({ name, address, deliveryPrice, eta, handleClick, selected }) {

  const containerDiv = useRef()
  const borderStyle = selected ? 'border-sky-600' : 'border-gray-400'

  return (<div ref={containerDiv} className={`min-w-[80%] columns-1 mb-5 border-2 rounded-lg ${borderStyle} w-fit p-3 m-auto bg-white`} onClick={handleClick}>
    <h1 className="mb-2 text-xl text-sky-600">{name}</h1>
    <Divider />
    <div className="flex place-items-center mb-2 mt-3">
      <div className="bg-sky-300 rounded-full w-6 h-6 mr-2"></div>
      <p className="bg-sky-200 p-2 rounded-xl text-sky-600">Address: {address}</p>
    </div>
    <div className="flex place-items-center mb-2 mt-3">
      <div className="bg-sky-300 rounded-full w-6 h-6 mr-2"></div>
      <p className="bg-sky-200 p-2 rounded-xl text-sky-600">Cost of delivery: {deliveryPrice} e</p>
    </div>
    <div className="flex place-items-center mb-2 mt-3">
      <div className="bg-sky-300 rounded-full w-6 h-6 mr-2"></div>
      <p className="bg-sky-200 p-2 rounded-xl text-sky-600">Pickup time: {eta}</p>
    </div>
  </div>)
}