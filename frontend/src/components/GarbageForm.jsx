import { useForm } from "react-hook-form"
import { useEffect } from "react"

const GARBAGE_TYPE = {
  CAR_BATTERY: 'Car Battery',
  SOFA: 'Sofa',
  FRIDGE: 'Fridge'
}

export default function GarbageForm() {

  // TODO: get garbage types from server with useEffect

  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="grid gap-6 mb-6 md:grid-cols-1 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

      <div className="grid">
        <label htmlFor="address" className=" text-left w-full block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Street Address:</label>
        <input type="text" className="pl-1 w-full border-gray-400 border-2 rounded-md" id="address" placeholder="e.g. Paradise Drive 666" {...register("example")} />
      </div>

      <div className="columns-2">
        <div>
          <label htmlFor="city" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">City</label>
          <input type="text" className="pl-1 border-gray-400 border-2 rounded-md" id="item_weight" placeholder="e.g. Espoo" {...register("example")} />
        </div>
        <div>
          <label htmlFor="postal_code" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Postal Code:</label>
          <input type="text" className="pl-1 border-gray-400 border-2 rounded-md" id="item_weight" placeholder="e.g. 69420" {...register("example")} />
        </div>

      </div>
      <div>
        <label htmlFor="garbage_type" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">Garbage type:</label>
        <select defaultValue='Select Garbage Type' id="garbage_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="SELECT">Select Garbage Type</option>
          <option value="BATTERY">{GARBAGE_TYPE.CAR_BATTERY}</option>
          <option value="SOFA">{GARBAGE_TYPE.SOFA}</option>
          <option value="FRIDGE">{GARBAGE_TYPE.FRIDGE}</option>
        </select>
      </div>


      <div className="grid items-center justify-center text-start">
        <label htmlFor="item_weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Item Weight (g):</label>
        <input type="text" className="pl-1 border-gray-400 border-2 rounded-md" id="item_weight" placeholder="e.g. 200 g" {...register("example")} />
      </div>

      <div className="grid items-center justify-center text-start">
        <p className="text-center">Item Size (cm3):</p>
        <div className="columns-3 gap-2 grid w-80" style={{ display: 'flex' }}>
          <div>
            <label htmlFor="item_height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Height (cm):</label>
            <input type="text" className="pl-1 border-gray-400 border-2 rounded-md w-24" id="item_height" placeholder="e.g. 20 cm" {...register("example")} />
          </div>
          <div>
            <label htmlFor="item_width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Width (cm):</label>
            <input type="text" className="pl-1 border-gray-400 border-2 rounded-md w-24" id="item_width" placeholder="e.g. 20 cm" {...register("example")} />
          </div>
          <div>
            <label htmlFor="item_depth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Depth (cm):</label>
            <input type="text" className="pl-1 border-gray-400 border-2 rounded-md w-24" id="item_depth" placeholder="e.g. 20 cm" {...register("example")} />
          </div>
        </div>
      </div>

      <div className="grid items-center justify-center text-start">
        <p className="mb-4"><label htmlFor="courier_info">Courier Info:</label></p>
        <textarea className="pl-1 border-gray-400 border-2 rounded-md" style={{ resize: 'none ' }} id="item_size" name="item_size" rows="4" cols="50" placeholder={'Write info for our courier here; e.g. how to best enter the building.'}></textarea>
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <button type="submit" class="w-2/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}