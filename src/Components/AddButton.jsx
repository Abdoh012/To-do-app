import { use } from "react";
import TaskContext from "./Contexts/TasksContext";

export default function AddButton({ children, handleClick }) {
  const { handleAddTaskClick } = use(TaskContext);

  return (
    <div>
      <button
        onClick={handleAddTaskClick}
        className="py-2.5 px-4 bg-black text-white rounded-lg cursor-pointer duration-300 hover:bg-[#000000e0]"
      >
        {children}
      </button>
    </div>
  );
}
