import ActionBtn from "../ActionBtn";
import Input from "../AuthForm/Input";
import "../../util/fontAwesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// index.js or main.jsx
import "animate.css/animate.min.css";
import { use } from "react";
import { motion } from "motion/react";
import { GoalsCtx } from "../Contexts/GoalsContext";
import DeleteBtn from "../DeleteBtn";

export default function GoalPopup({
  goalText,
  goalDescription,
  goalDate,
  goalSubTasks,
  children,
}) {
  // -------------------- Contexts --------------------
  const {
    subTasks,
    milestones,
    goalTextRef,
    goalDescriptionRef,
    goalDateRef,
    goalSubTasksRef,
    goalMilestoneRef,
    handleAddSubTask,
    handleRemoveSubTask,
    handleAddMilestone,
    handleRemoveMilestone,
    handleCancelBtnClick,
    handleAddNewGoalClick,
    handleEditGoalClick,
  } = use(GoalsCtx);
  // End of contexts

  // -------------------- States --------------------

  //End of states

  // -------------------- Functions --------------------

  // End of functions

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
      <div className="w-140 max-h-[650px] overflow-y-auto bg-white p-5 rounded-lg">
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
            value={goalText}
            required={true}
            placeholder="Goal title"
            id="Title"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            ref={goalTextRef}
          />

          {/* Description */}
          <div className="mb-5">
            <label
              className="block mb-3 font-semibold text-sm"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              defaultValue={goalDescription}
              className="resize-none input-focus px-4 py-3 w-full h-20 rounded-lg duration-300 bg-[#f3f3f5]"
              id="description"
              placeholder="Task description (optional)"
              ref={goalDescriptionRef}
            ></textarea>
          </div>

          {/* Due date */}
          <Input
            value={goalDate}
            id="Target Date"
            font="font-semibold text-sm"
            margin="mb-3"
            type="date"
            ref={goalDateRef}
          />

          {/* Sub tasks */}
          <Input
            id="Sub-tasks"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            placeholder="sub tasks"
            addBtn={true}
            handleClick={handleAddSubTask}
            ref={goalSubTasksRef}
          />

          {/* Sub tasks will be added */}

          <div className="mb-3">
            {subTasks.map((subTask) => (
              <div
                key={subTask.id}
                className="flex justify-between items-center p-2 rounded-lg bg-neutral-100 mt-2"
              >
                <p>{subTask.title}</p>
                <p>
                  <DeleteBtn
                    id={subTask.id}
                    handleClick={handleRemoveSubTask}
                  ></DeleteBtn>
                </p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <Input
            id="Milestones"
            font="font-semibold text-sm"
            margin="mb-3"
            type="text"
            placeholder="milestones"
            addBtn={true}
            handleClick={handleAddMilestone}
            ref={goalMilestoneRef}
          />

          {/* Milestones will be added */}
          <div className="mb-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex justify-between items-center p-2 rounded-lg bg-neutral-100 mt-2"
              >
                <p>{milestone.title}</p>
                <p>
                  <DeleteBtn
                    id={milestone.id}
                    handleClick={handleRemoveMilestone}
                  ></DeleteBtn>
                </p>
              </div>
            ))}
          </div>

          {/* Add task button */}
          <ActionBtn
            handleClick={
              children === "Add New Goal"
                ? handleAddNewGoalClick
                : handleEditGoalClick
            }
          >
            {children}
          </ActionBtn>
        </form>
      </div>
    </motion.div>
  );
}
