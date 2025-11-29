export default function ActionBtn({ children, handleClick }) {
  return (
    <button
      className="w-full bg-black text-center text-white py-2 rounded-lg cursor-pointer hover:bg-[#000000e0] duration-300"
      onClick={handleClick && handleClick}
    >
      {children}
    </button>
  );
}
