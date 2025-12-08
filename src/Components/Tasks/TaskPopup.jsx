import ActionBtn from "../ActionBtn";
import Input from "../AuthForm/Input";
import "../../util/fontAwesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// index.js or main.jsx
import "animate.css/animate.min.css";
import { use } from "react";
import TaskContext from "../Contexts/TasksContext";
import { motion } from "motion/react";

export default function TaskPopup({
  taskText,
  taskDescription,
  taskCategory,
  taskDate,
  children,
}) {
  // Contexts
  const {
    taskTextRef,
    taskDescriptionRef,
    taskCategoryRef,
    taskDateRef,
    handleAddNewTaskClick,
    handleEditTaskClick,
    handleCancelBtnClick,
  } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className={`w-full h-full flex items-center justify-center fixed bg-[#dedede88] backdrop-blur-[1px]`}
      style={{ zIndex: 100 }}
    >
      <div className="w-140 bg-white p-5 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <p className="font-semibold text-lg">{children}</p>
          <button
            className="text-neutral-700 cursor-pointer"
            onClick={handleCancelBtnClick}
          >
            <FontAwesomeIcon icon="fa-solid fa-x" size="sm" />
          </button>
        </div>

        <form action="">
          {/* Title input */}
          <Input
            value={taskText}
            required={true}
            placeholder="Task title"
            id="Title"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            ref={taskTextRef}
          ></Input>

          {/* Description */}
          <div className="mb-5">
            <label
              className="block mb-3 font-semibold text-sm"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              defaultValue={taskDescription}
              className="resize-none input-focus px-4 py-3 w-full h-20 rounded-lg duration-300 bg-[#f3f3f5]"
              id="description"
              placeholder="Task description (optional)"
              ref={taskDescriptionRef}
            ></textarea>
          </div>

          {/* Category */}
          <Input
            value={taskCategory}
            placeholder="e.g., Work, Personal"
            id="Category"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            ref={taskCategoryRef}
          ></Input>

          {/* Due date */}
          <Input
            value={taskDate}
            id="Due Date"
            font="font-semibold text-sm"
            margin="mb-3"
            type="date"
            ref={taskDateRef}
          ></Input>

          {/* Add task button */}
          <ActionBtn
            handleClick={
              children === "Add New Task"
                ? handleAddNewTaskClick
                : handleEditTaskClick
            }
          >
            {children}
          </ActionBtn>
        </form>
      </div>
    </motion.div>
  );
}