import React from "react"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import DarkModeSwitch from "./utilities/switches/DarkModeSwitch"
import { Link } from "react-router-dom"

export default function Header({ currentLocation }) {
  const links = [
    { title: "Emulator", location: "/emulator" },
    { title: "Simulation", location: "/" },
    { title: "About", location: "/about" },
  ]

  return (
    <Disclosure as="nav" className="bg-slate-700 dark:bg-slate-700 text-white space-x-4">
      {({ open }) => {
        return (
          <>
            <div className="relative flex items-center justify-between h-14 md:h-16">
              <div className="absolute inset-y-0 right-4 flex items-start md:hidden">
                <Disclosure.Button className="transition duration-200 ease inline-flex items-center justify-center p-1 ml-3 mt-3 rounded-xl text-gray-400 hover:text-white hover:bg-slate-400 focus:outline-none focus:ring focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-between md:items-stretch md:justify-between md:mx-2">
                <div className="text-slate-600 dark:text-white hover:opacity-80 duration-200 relative inline-flex h-auto py-0.5 ml-4 md:mx-2 space-x-12">
                  <Link to="/" className="flex items-center space-x-2">
                    <h2 className="font-bold text-white tracking-tighter duration-150 hover:text-blue-200">
                      Internet of Everything
                    </h2>
                  </Link>
                </div>
                <div className="hidden md:inline-flex md:space-x-6">
                  {links.map((location, index) => (
                    <Link to={location.location} key={`location-${index}`}>
                      <button
                        type="button"
                        className="text-sky-50 dark:text-white hover:bg-slate-400/50 hover:text-white font-medium tracking-wider uppercase px-1.5 py-0.5 rounded duration-200"
                      >
                        <span className={currentLocation === location.title ? "underline" : ""}>{location.title}</span>
                      </button>
                    </Link>
                  ))}
                </div>
                <div className="hidden md:block md:ml-6">
                  <div className="flex space-x-2 mr-2">
                    <span key="nav-dark-mode" className="px-2 pt-1 pb-0.5 rounded-xl h-auto">
                      <DarkModeSwitch />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="flex flex-col px-0 pb-3 mr-4 space-y-1 md:block md:px-2">
                <span key="nav-dark-mode" className="rounded-xl text-lg font-medium h-auto mb-4">
                  <DarkModeSwitch />
                </span>
                {links.map((location, index) => (
                  <span className="rounded text-lg font-medium h-auto mb-4" key={`mobile-nav-${index}`}>
                    <Link to={location.location} key={`location-${index}`}>
                      <button
                        type="button"
                        className="text-sky-50 dark:text-white hover:bg-slate-400/50 hover:text-white font-medium tracking-wider uppercase px-1.5 py-0.5 rounded duration-200"
                      >
                        <span className={currentLocation === location.title ? "underline" : ""}>{location.title}</span>
                      </button>
                    </Link>
                  </span>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}
