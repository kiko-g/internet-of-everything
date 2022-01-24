import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"

export default function PresetsModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="group">
      <button
        type="button"
        onClick={openModal}
        className="ml-1 font-medium font-sans text-sm tracking-normal w-full text-slate-600 rounded-b-xl opacity-75 hover:opacity-100 duration-200"
      >
        Need help?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center bg-black/50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 dark:bg-slate-700 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-800 dark:text-white">
                    About
                  </Dialog.Title>
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-sm font-medium text-slate-800 bg-slate-100 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                    onClick={closeModal}
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col items-start mt-2 space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    This section allows the user to toggle between factorty representations, which allows for different simulation
                    outcomes.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    To add your preset click the <code className="text-sky-500 dark:text-sky-200">Add your preset</code> button
                    and upload a JSON file with the same syntax as the ones already available.
                  </p>
                  <button
                    type="button"
                    className="self-end px-4 py-2 text-sm font-medium 
                    text-blue-900 bg-blue-200 dark:text-slate-100 bg-opacity-25 dark:bg-opacity-50 dark:hover:bg-opacity-75 hover:bg-opacity-75
                    border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
