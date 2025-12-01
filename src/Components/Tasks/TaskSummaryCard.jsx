import { Checkbox } from "@/components/ui/checkbox";
import "../../util/fontAwesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use } from "react";
import TaskContext from "../../Components/Contexts/TasksContext.jsx";
export default function TaskSummaryCard({
  taskText,
  taskDescription,
  taskDate,
  taskCategory,
  id,
  completed,
  animation,
}) {
  // Contexts
  const { taskState, handleRemoveTask, handleEdit } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      <div
        className={`${
          completed && "opacity-60!"
        } bg-white flex justify-between mb-5  border border-neutral-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 animate__animated ${
          !animation ? "animate__fadeIn" : "animate__fadeOut"
        }`}
        style={{ "--animate-duration": "0.5s", opacity: 1, }}
      >
        {/* Left side */}
        <div>
          {/* Task Check box */}
          <div className="flex mb-2 gap-2">
            {/* You can only use normal events but onCheckedChange is better */}
            <div>
              <Checkbox
                checked={completed}
                id="terms"
                className="cursor-pointer"
                onCheckedChange={(checked) => {
                  checked ? taskState(id, true) : taskState(id, false);
                }}
              />
            </div>

            {/* Task details */}
            <div className="">
              {/* Task title */}
              <p className={`${completed && "line-through"} mb-2`}>
                {taskText}
              </p>

              {/* Task description */}
              {taskDescription && (
                <div className="text-neutral-600 mb-2">{taskDescription}</div>
              )}

              {/* Task Category and date */}
              <div className="flex items-center gap-2">
                {/* Category */}
                {taskCategory && (
                  <div className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">
                    {taskCategory}
                  </div>
                )}

                {/* Date */}
                {taskDate && (
                  <div className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 flex items-center gap-1">
                    <FontAwesomeIcon icon="fa-regular fa-calendar" />
                    <span>{taskDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Edit button */}
          <button
            className="cursor-pointer p-2 hover:bg-neutral-200 duration-300 rounded-lg"
            onClick={() => handleEdit(id)}
          >
            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
          </button>

          {/* Delete button */}
          <button
            className="cursor-pointer text-red-600 p-2 hover:bg-neutral-300 duration-300 rounded-lg"
            onClick={() => handleRemoveTask(id)}
          >
            <FontAwesomeIcon icon="fa-regular fa-trash-can" />
          </button>
        </div>
      </div>
    </div>
  );
}
