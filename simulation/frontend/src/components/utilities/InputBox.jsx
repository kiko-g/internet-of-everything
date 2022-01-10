import React from "react"

export default function InputBox({ state, label = "", types = [], classnames = "", placeholder = "...", title }) {
  const [value, setValue] = state
  return (
    <div className={`h-full shadow ${classnames}`}>
      {label !== "" ? (
        <label htmlFor="price" className="text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <div className="h-full relative rounded">
        <input
          type="text"
          name="price"
          id="price"
          className="h-full bg-zinc-50 focus:bg-white focus:ring-slate-500 focus:border-slate-500 border-2 border-white block w-full sm:text-sm text-slate-700 rounded"
          title={title || `Enter your search string here`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        {types.length !== 0 ? (
          <div className="absolute inset-y-0 right-0 bg-slate-700 text-white hover:opacity-95 duration-200 rounded-r border-2 border-slate-700">
            <select
              id="type"
              name="type"
              title="Choose type of search"
              className="bg-slate-400 focus:ring-transparent focus:border-transparent focus:accent-slate-700 h-full py-0 pl-2 pr-7 border-transparent bg-transparent font-bold sm:text-sm rounded hover:cursor-pointer"
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
