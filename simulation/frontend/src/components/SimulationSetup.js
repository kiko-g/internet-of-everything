import * as React from "react";
import Basic from './input/Basic'

export default function SimulationSetup() {
  return (
    <div className="hidden md:grid md:grid-cols-4 space-x-0 dark:text-gray-50">
      <div className="col-span-3 p-8 pt-4 dark:bg-bluegray-600">
        <div className="grid grid-cols-3 gap-y-4 gap-x-16">
          <Basic label="Amount" />
          <Basic label="Whatever" />
          <Basic label="Something" />
          <Basic label="Something Else" />
          <Basic label="Another one" />
        </div>
      </div>

      <div class="p-4 flex">
        <p class="text-xl mt-2 ml-16 dark:bg-bluegray-600">Start&nbsp;&nbsp;</p>
      
        <div className="dark:bg-bluegray-600">
          <button className={`p-2 rounded-6xl border-2 border-teal-800 text-coolgray-200 bg-teal-400 hover:opacity-50 duration-100`}>{
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 23"><path d="M3 22v-20l18 10-18 10z"/></svg>}</button>  
        </div>

        <p class="text-xl mt-2 dark:bg-bluegray-600">&nbsp;&nbsp;Save JSON&nbsp;&nbsp;</p>
      
        <div className="dark:bg-bluegray-600">
          <button className={`p-2 rounded-6xl border-2 border-teal-800 text-coolgray-200 bg-blue-400 hover:opacity-50 duration-100`}>{
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>}</button>  
        </div>
      </div>
    </div>
  );
}
