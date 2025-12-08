export default function ActionBtn({ children, handleClick }) {
  return (
    <button
      type="submit"
      className="w-full bg-black text-center text-white py-2 rounded-sm cursor-pointer hover:bg-[#000000e0] duration-300"
      onClick={handleClick && handleClick}
    >
      {children}
    </button>
  );
}
