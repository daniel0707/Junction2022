import GarbageCenterCard from "./GarbageCenterCard"

export default function GarbageCenterList(props) {

  return (<div>
    <h1 className="text-3xl mb-12">Click on a garbage center to choose it</h1>
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