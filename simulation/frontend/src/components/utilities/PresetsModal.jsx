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
        What is this?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
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
                  <Dialog.Title as="h2" className="text-xl font-medium leading-6 text-slate-800 dark:text-white">
                    Help
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
                  <p className="text-gray-700 dark:text-gray-300">
                    This section allows the user to <span className="font-medium">toggle between factorty representations</span>.
                    The purpose of this section is to allow users to create different simulation outcomes for different factory
                    layouts.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    This section also allows the user to upload their own factory layout using the{" "}
                    <code className="px-2 font-bold text-blue-500 dark:text-amber-300">Add preset</code> button. This button will
                    prompt the user to select a JSON file and will add that factory layout to the list of available presets.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Make sure the JSON file you choose to upload is{" "}
                    <span className="font-medium">compliant with the expected JSON format</span>. The format is available in the
                    JSON tab button and we recommend copying the json text to the clipboard using the{" "}
                    <code className="px-2 font-bold text-blue-500 dark:text-amber-300">Copy</code> button.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    The storage of these files is not persistent which means you should not delete your local file, since if you
                    refresh your tab or close your browser the file won't be available as a preset
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/softeng-feup/ds-meic1"
                      className="self-end px-4 py-2 text-sm font-medium duration-150 border
                      border-rose-800/80 text-rose-800 hover:bg-rose-800 hover:text-white
                      dark:border-rose-400 dark:text-rose-400 dark:hover:border-rose-500 dark:hover:bg-rose-500 dark:hover:text-white
                       rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
                      onClick={closeModal}
                    >
                      Contact dev team
                    </a>
                    <button
                      type="button"
                      className="self-end px-4 py-2 text-sm font-medium duration-150 border
                       border-blue-700/80 bg-blue-700 text-white hover:bg-blue-600 hover:border-blue-600
                       dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400 dark:hover:border-blue-400
                       rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
