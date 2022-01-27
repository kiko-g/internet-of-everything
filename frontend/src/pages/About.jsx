import React, { useEffect } from "react"
import Header from "../components/Header"

export default function About() {
  useEffect(() => {
    document.title = "IOE | About"
  }, [])

  return (
    <div className="homepage min-h-screen bg-slate-200 dark:bg-slate-700 font-sans font-medium">
      <Header currentLocation="About" />
      <div className="min-h-adjusted mx-auto px-12 py-8 space-y-10">
        <div className="space-y-2">
          <h3 className="sm:text-2xl sm:leading-snug font-semibold tracking-wide uppercase text-slate-600 dark:text-white">
            About
          </h3>
          <div className="text-xl text-gray-700 dark:text-gray-100 font-normal">
            <p className="text-justify">
              <span className="font-bold underline decoration-2 decoration-blue-500/50">Internet of Everything</span> is a
              platform that aims to facilitate the{" "}
              <span className="font-bold underline decoration-2 decoration-teal-500/50">management</span> and{" "}
              <span className="font-bold underline decoration-2 decoration-rose-500/50">maintenance</span> of a factory, through
              the usage of a interface that allows the user to see the current state of the factory, as well as simulating
              behavior a factory configuration. This application was developed in the context of{" "}
              <a
                href="https://sigarra.up.pt/feup/en/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=486299"
                className="text-blue-500 dark:text-blue-300 duration-150 hover:text-blue-500/80 hover:underline dark:hover:text-blue-300/80 dark:hover:underline"
              >
                Large Scale Software Development
              </a>
              , a course taught at FEUP,{" "}
              <a
                href="https://sigarra.up.pt/feup/pt/CUR_GERAL.CUR_PLANOS_ESTUDOS_VIEW?pv_plano_id=31204&pv_ano_lectivo=2021"
                className="text-blue-500 dark:text-blue-300 duration-150 hover:text-blue-500/80 hover:underline dark:hover:text-blue-300/80 dark:hover:underline"
              >
                MEIC
              </a>
              .{" "}
              <span className="italic">
                "Eveything is connected; not just the devices, but also the products. We call this Internet of Everything."
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="sm:text-2xl sm:leading-snug font-semibold tracking-wide uppercase text-slate-600 dark:text-white">
            FAQ
          </h3>
          <ul className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-8 py-4 font-normal">
            <li>
              Will this platform <span className="font-bold underline decoration-2 decoration-teal-500/50">evolve</span> with
              time?
            </li>
            <li className="text-lg list-inside list-none text-gray-500 dark:text-gray-300">
              Perhaps. The purpose of this project was to illustrate how the team would go about solving the given problem all the
              while thinking of creating a sustainable basis and a good starting point for future work.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
