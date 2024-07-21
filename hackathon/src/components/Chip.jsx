import React from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";

function Chip({value, onClick, selected}) {

  return (
    <li
      className={`px-2 py-1.5 outline outline-gray-300 rounded-md text-sm flex items-center gap-1.5 hover:cursor-pointer hover:bg-gray-100 ${
        selected != -1 ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      {selected != -1 && <CheckIcon className="w-4 h-4" />}
      {value}
    </li>
  );
}

export default Chip
