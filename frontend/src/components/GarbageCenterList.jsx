import GarbageCenterCard from "./GarbageCenterCard"

export default function GarbageCenterList() {

  return (<div>
    <h1>Click on a garbage center to choose it</h1>
    {props.children.map(gc => {
      return <GarbageCenterCard
        name={gc.name}
        address={gc.address}
        deliveryPrice={gc.price}
        eta={gc.eta}
        handleClick={gc.handleClick}
      />
    })}
  </div>)
}