import React from "react"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import DarkModeSwitch from "./utilities/switches/DarkModeSwitch"
import { Link } from "react-router-dom"

export default function Header({ siteTitle = "IOE", location }) {
  return (
    <Disclosure as="nav" className="bg-slate-700 dark:bg-slate-700 text-white space-x-4">
      {({ open }) => {
        return (
          <>
            <div className="mx-auto">
              <div className="relative flex items-center justify-between h-16 sm:h-12 md:h-12 lg:h-12 xl:h-12">
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

                <div className="flex-1 flex items-center justify-between md:items-stretch md:justify-between md:mx-2 duration-150">
                  <div className="text-md font-medium h-auto py-1 ml-4 md:mx-2">
                    <div className="flex items-center space-x-2">
                      <Link to="/" className="flex items-center space-x-2 hover:opacity-90">
                        <h2
                          className="text-blue-400 text-lg tracking-wider uppercase 
                        hover:underline hover:decoration-2 hover:decoration-blue-500 "
                        >
                          {siteTitle}
                        </h2>
                      </Link>
                      <span aria-hidden="true">&middot;</span>
                      <span className="font-light text-sm">{location}</span>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-6">
                    <div className="flex space-x-2 mr-2">
                      <span key="nav-dark-mode" className="px-2 pt-1 pb-0.5 rounded-xl h-auto divide-x-2 divide-red-400 mr-1w">
                        <DarkModeSwitch />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* @@ Mobile view */}
            <Disclosure.Panel className="md:hidden">
              <div className="flex flex-col px-0 pb-3 mr-4 space-y-1 md:block md:px-2">
                <span key="nav-dark-mode" className="rounded-xl text-lg font-medium h-auto mb-4">
                  <DarkModeSwitch />
                </span>
              </div>
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}

