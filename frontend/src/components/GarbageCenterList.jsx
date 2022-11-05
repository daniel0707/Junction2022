import GarbageCenterCard from "./GarbageCenterCard"

export default function GarbageCenterList(props) {

  return (<div className="bg-gray-200 p-2">
    <h1 className="text-2xl mb-8 bg-sky-200 p-4 rounded-lg m-auto mt-6 w-full text-sky-600">Click on a garbage center to select it</h1>
    {props.children.map(gc => {
      return <GarbageCenterCard
        key={gc.name}
        name={gc.name}
        address={gc.address}
        deliveryPrice={gc.price}
        eta={gc.eta}
        handleClick={gc.handleClick}
      />
    })}
  </div>)
}