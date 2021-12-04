import * as React from "react";

export default function Button(props) {
  const text = props.text || "Button"

  return (
    <button className={`p-2 rounded-md border-2 border-teal-800 text-coolgray-200 bg-teal-500 hover:opacity-50 duration-100`}>{text}</button>
  );
}
