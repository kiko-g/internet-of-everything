import React from "react"

export default function InputBox({ label = "Label", types = [], classnames = "", placeholder = "..." }) {
  return (
    <div className={`${classnames}`}>
      <label htmlFor="price" className="block text-lg font-bold text-slate-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-xl shadow-sm">
        <input
          type="text"
          name="price"
          id="price"
          className="bg-zinc-100 focus:bg-white focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm text-gray-700 border-gray-300 rounded-xl"
          placeholder={placeholder}
        />
        {types.length !== 0 ? (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="type" className="sr-only">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="focus:ring-sky-500 focus:border-sky-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-xl"
            >
              {types.map((item, index) => (
                <option key={`option-${index}`}>{item}</option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  )
}
