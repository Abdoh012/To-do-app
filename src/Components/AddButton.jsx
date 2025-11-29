export default function AddButton({ children, handleClick }) {
  
  return (
    <div>
      <button
        onClick={handleClick}
        className="py-2.5 px-4 bg-black text-white rounded-lg cursor-pointer duration-300 hover:bg-[#000000e0]"
      >
        {children}
      </button>
    </div>
  );
}
