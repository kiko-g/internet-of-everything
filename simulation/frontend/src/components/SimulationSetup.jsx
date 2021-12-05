import * as React from "react"
import BasicInput from "./utilities/BasicInput"

export default function SimulationSetup() {
  return (
    <div className="md:grid md:grid-cols-4 space-x-0 dark:text-gray-50">
      <div className="col-span-3 p-10 pt-4">
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-5 md:gap-y-4 md:gap-x-8">
          <BasicInput label="Amount" />
          <BasicInput label="Whatever" />
          <BasicInput label="Something" />
          <BasicInput label="Something Else" />
        </div>
      </div>
      {/* <div class="p-4 flex">
        <p class="text-xl mt-2 ml-16 dark:bg-bluegray-600">Start&nbsp;&nbsp;</p>

        <div className="dark:bg-bluegray-600">
          <button
            className={`p-2 rounded-6xl border-2 border-teal-800 text-coolgray-200 bg-teal-400 hover:opacity-50 duration-100`}
          >
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 20 23"
              >
                <path d="M3 22v-20l18 10-18 10z" />
              </svg>
            }
          </button>
        </div>

        <p class="text-xl mt-2 dark:bg-bluegray-600">
          &nbsp;&nbsp;Save JSON&nbsp;&nbsp;
        </p>

        <div className="dark:bg-bluegray-600">
          <button
            className={`p-2 rounded-6xl border-2 border-teal-800 text-coolgray-200 bg-blue-400 hover:opacity-50 duration-100`}
          >
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z" />
              </svg>
            }
          </button>
        </div>
      </div> */}
      <div className="col-span-1 p-10">
        <div className="block md:flex  space-y-4 md:space-y-0 md:space-x-4">
          <button
            className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            data-modal-toggle="small-modal"
          >
            Edit
          </button>
          <button
            className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            data-modal-toggle="default-modal"
          >
            Default modal
          </button>
          <button
            className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            data-modal-toggle="extralarge-modal"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  )
}
