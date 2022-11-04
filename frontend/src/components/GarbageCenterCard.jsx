import Divider from "./Divider"

export default function GarbageCenterCard({ name, address, deliveryPrice, eta, handleClick }) {

  return (<div className="columns-1 mb-3 border-2 rounded-md border-gray-200" onClick={handleClick}>
    <h1 className="mb-2">{name}</h1>
    <Divider />
    <p className="mb-1">Address: {address}</p>
    <p className="mb-1">Cost of delivery: {deliveryPrice} e</p>
    <p>Time of delivery: {eta}</p>
  </div>)
}