function Button({text, onClick}) {
  return (
    <button
      onClick={onClick}
      className="order-black border-2 rounded-2xl py-2 px-4"
    >
      {text}
    </button>
  );
}

export default Button