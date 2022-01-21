import React from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"

export default function Collapsed({ children, open = false, color = "blue", classnames = "", headline = "Headline text" }) {
  return (
    <Disclosure defaultOpen={open} as="div" className={`duration-200 ${classnames}`}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`
              flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-xl duration-300
              text-${color}-800 bg-${color}-200 hover:bg-${color}-300 focus-visible:ring focus-visible:ring-${color}-500 focus-visible:ring-opacity-75
              hover:opacity-90 focus:outline-none focus-visible:ring focus:ring-opacity-75`}
          >
            <span>{headline}</span>
            <ChevronUpIcon
              className={`
              w-5 h-5 text-${color}-600
              ${open ? "transform rotate-180" : ""}`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-2 pt-2 pb-3 text-sm text-slate-700">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
