import { Checkbox } from "@/components/ui/checkbox";
import "../../util/fontAwesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use } from "react";
import TaskContext from "../Contexts/TasksContext.jsx";
import CardStyle from "../CardStyle.jsx";
import EditBtn from "../EditBtn.jsx";
import DeleteBtn from "../DeleteBtn.jsx";
import { motion } from "motion/react";
export default function TaskCard({
  taskText,
  taskDescription,
  taskDate,
  taskCategory,
  id,
  completed,
  pending,
  ...props
}) {
  // -------------------- Contexts --------------------
  const { taskState, handleRemoveTask, handleEdit } = use(TaskContext);
  // End of contexts  

  // Component structure
  return (
    <CardStyle flex={true} {...props}>
      
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
            <p
              className={`${
                completed && "line-through"
              } mb-2 text-lg leading-5`}
            >
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
                <div className="px-2 py-2 rounded-sm bg-emerald-100 text-emerald-700">
                  {taskCategory}
                </div>
              )}

              {/* Date */}
              {taskDate && (
                <div className="px-2 py-2 rounded-sm bg-amber-100 text-amber-700 flex items-center gap-1">
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
        <EditBtn id={id} handleClick={handleEdit}></EditBtn>

        {/* Delete button */}
        <DeleteBtn id={id} handleClick={handleRemoveTask}></DeleteBtn>
      </div>
    </CardStyle>
  );
}

export const MotionTaskCard = motion.create(TaskCard);
