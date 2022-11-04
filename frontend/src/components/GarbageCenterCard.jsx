import Divider from "./Divider"

export default function GarbageCenterCard({ name, address, deliveryPrice, eta, handleClick }) {

  return (<div className="columns-1 mb-3 border-2 rounded-md border-gray-400 w-fit min-w-fit p-3 m-auto" onClick={handleClick}>
    <h1 className="mb-2 text-2xl">{name}</h1>
    <Divider />
    <p className="mb-1">Address: {address}</p>
    <p className="mb-1">Cost of delivery: {deliveryPrice} e</p>
    <p>Time of delivery: {eta}</p>
  </div>)
}