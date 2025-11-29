import ActionBtn from "../ActionBtn";
import Input from "../AuthForm/Input";
import "../../util/fontAwesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// index.js or main.jsx
import "animate.css/animate.min.css";
import { use } from "react";
import TaskContext from "../Contexts/TasksContext";

export default function AddPopup({ handleClick, animation }) {
  // Context
  const {
    taskTextRef,
    taskDescriptionRef,
    taskCategoryRef,
    taskDateRef,
    handleAddNewTaskClick,
  } = use(TaskContext);
  // End of context
  return (
    <div
      className={`animate__animated ${animation}  w-full h-full flex items-center justify-center fixed bg-[#dedede88] backdrop-blur-[1px]`}
      style={{ "--animate-duration": "0.5s", zIndex: 100, }}
    >
      <div className="w-140 bg-white p-5 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <p className="font-semibold text-lg">Add New Task</p>
          <button
            className="text-neutral-700 cursor-pointer"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon="fa-solid fa-x" size="sm" />
          </button>
        </div>

        <form action="">
          {/* Title input */}
          <Input
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
              className="resize-none input-focus px-4 py-3 w-full h-20 rounded-lg duration-300 bg-[#f3f3f5]"
              id="description"
              placeholder="Task description (optional)"
              ref={taskDescriptionRef}
            ></textarea>
          </div>

          {/* Category */}
          <Input
            placeholder="e.g., Work, Personal"
            id="Category"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            ref={taskCategoryRef}
          ></Input>

          {/* Due date */}
          <Input
            id="Due Date"
            font="font-semibold text-sm"
            margin="mb-3"
            type="date"
            ref={taskDateRef}
          ></Input>

          {/* Add task button */}
          <ActionBtn handleClick={handleAddNewTaskClick}>
            Add New Task
          </ActionBtn>
        </form>
      </div>
    </div>
  );
}
