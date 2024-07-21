import { ArrowRightIcon } from "@heroicons/react/16/solid";

function Button({text, onClick, large}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row items-center gap-3 order-black border-2 rounded-xl py-3 px-4 font-semibold tracking-wide grow-0 ${
        large ? "px-6 py-4 text-2xl" : ""
      }`}
    >
      {text}
      {large && <ArrowRightIcon className="w-6 h-6" />}
    </button>
  );
}

export default Button