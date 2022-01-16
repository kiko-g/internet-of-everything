import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

export default function Select({ selectedHook, options }) {
  const [selected, setSelected] = selectedHook

  return (
    <div className="h-12 z-20 w-64 shadow rounded">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative h-full">
          <Listbox.Button className="relative w-full h-full  py-2 pl-3 pr-10 text-left bg-white rounded cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-gray-500 sm:text-sm">
            <span className="flex items-center justify-start space-x-2 truncate">
              <span className={`h-4 w-4 ${selected.color} rounded-full`} />
              <span className="font-normal tracking-wide">{selected.name}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? "text-gray-900 bg-gray-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>{person.name}</span>
                      {selected ? (
                        <span
                          className={`${active ? "text-gray-600" : "text-gray-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
