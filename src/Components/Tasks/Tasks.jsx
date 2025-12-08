import { use } from "react";
import AddButton from "../AddButton";
import PagesContainer from "../PagesContainer";
import TaskFilterButton from "./TaskFilterButton";
import AllTasks from "./FilterTasks/AllTasks";
import CompletedTasks from "./FilterTasks/CompletedTasks";
import PendingTasks from "./FilterTasks/PendingTasks";
import TodayTasks from "./FilterTasks/TodayTasks";
import { taskCards, taskFilterBtns } from "../../util/data";
import TaskPopup from "./TaskPopup";
import QUOTE from "@/util/quotes";
import { Toaster } from "@/components/ui/sonner";
import TaskContext from "../Contexts/TasksContext";
import TopSection from "../TopSection";
import { AnimatePresence } from "motion/react";

export default function Tasks() {
  const {
    activeBtn,
    showPopup,
    editingId,
    tasks,
    numberOfTasks,
    numberOfCompletedTasks,
    numberOfPendingTasks,
    handleAddTaskClick,
  } = use(TaskContext);

  // Testing
  // End of testing

  // Component structure
  return (
    <>
      {/* Notification */}
      <div>
        <Toaster />
      </div>

      {/* Add task popup */}

      <AnimatePresence>
        {showPopup.addPopup ? (
          <TaskPopup>Add New Task</TaskPopup>
        ) : // Edit task popup
        showPopup.editPopup ? (
          <TaskPopup
            taskText={tasks.find((task) => task.id === editingId)?.taskText}
            taskDescription={
              tasks.find((task) => task.id === editingId)?.taskDescription
            }
            taskCategory={
              tasks.find((task) => task.id === editingId)?.taskCategory
            }
            taskDate={tasks.find((task) => task.id === editingId)?.taskDate}
          >
            Edit Task
          </TaskPopup>
        ) : undefined}
      </AnimatePresence>

      <PagesContainer>
        {/* Header of the section task */}
        <TopSection
          cards={taskCards}
          all={numberOfTasks}
          completed={numberOfCompletedTasks}
          pending={numberOfPendingTasks}
        >
          Stay organized and productive
        </TopSection>

        {/* Task filter and add buttons*/}
        <div className="flex justify-between my-5">
          <div className="flex gap-3">
            {taskFilterBtns.map((filterBtn) => {
              return (
                <TaskFilterButton key={filterBtn}>{filterBtn}</TaskFilterButton>
              );
            })}
          </div>
          <AddButton handleClick={handleAddTaskClick}>+ Add Task</AddButton>
        </div>

        {/* Quote */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-7 mt-5">
          <i>{QUOTE}</i>
        </div>

        {/* (AllTasks or CompletedTask or PendingTasks or TodayTasks) page */}

        {activeBtn === "All" ? (
          <AllTasks></AllTasks>
        ) : activeBtn === "Completed" ? (
          <CompletedTasks></CompletedTasks>
        ) : activeBtn === "Pending" ? (
          <PendingTasks></PendingTasks>
        ) : activeBtn === "Today" ? (
          <TodayTasks></TodayTasks>
        ) : null}
      </PagesContainer>
    </>
  );
}
