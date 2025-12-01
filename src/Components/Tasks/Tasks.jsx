import { use, useRef, useState } from "react";
import AddButton from "../AddButton";
import Header from "../Header";
import PagesContainer from "../PagesContainer";
import TaskStatsCard from "./TaskStatsCard";
import TaskFilterButton from "./TaskFilterButton";
import AllTasks from "./FilterTasks/AllTasks";
import CompletedTasks from "./FilterTasks/CompletedTasks";
import PendingTasks from "./FilterTasks/PendingTasks";
import TodayTasks from "./FilterTasks/TodayTasks";
import { taskCards, taskFilterBtns } from "../../util/data";
import AddAndEditPopup from "./AddAndEditPopup";
import QUOTE from "@/util/quotes";
import { Toaster } from "@/components/ui/sonner";
import TaskContext from "../Contexts/TasksContext";

export default function Tasks() {
  const {
    activeBtn,
    showPopup,
    showAnimation,
    editingId,
    tasks,
    numberOfTasks,
    numberOfCompletedTasks,
    numberOfPendingTasks,
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

      {showPopup.addPopup ? (
        <AddAndEditPopup
          taskDate={tasks.find((task) => task.id === editingId)?.taskDate}
          animation={showAnimation ? "animate__fadeIn" : "animate__fadeOut"}
        >
          Add New Task
        </AddAndEditPopup>
      ) : // Edit task popup
      showPopup.editPopup ? (
        <AddAndEditPopup
          taskText={tasks.find((task) => task.id === editingId)?.taskText}
          taskDescription={
            tasks.find((task) => task.id === editingId)?.taskDescription
          }
          taskCategory={
            tasks.find((task) => task.id === editingId)?.taskCategory
          }
          taskDate={tasks.find((task) => task.id === editingId)?.taskDate}
          animation={showAnimation ? "animate__fadeIn" : "animate__fadeOut"}
        >
          Edit Task
        </AddAndEditPopup>
      ) : undefined}

      <PagesContainer>
        {/* Header of the section task */}
        <Header>Stay organized and productive</Header>

        {/* Stats cards */}
        <div className="flex justify-between gap-4">
          {taskCards.map((taskCard) => {
            return (
              <TaskStatsCard
                key={taskCard.id}
                icon={taskCard.icon}
                bgColor={taskCard.bgColor}
                count={
                  taskCard.title === "Total tasks"
                    ? numberOfTasks
                    : taskCard.title === "Completed"
                    ? numberOfCompletedTasks
                    : numberOfPendingTasks
                }
              >
                {taskCard.title}
              </TaskStatsCard>
            );
          })}
        </div>

        {/* Task filter and add buttons*/}
        <div className="flex justify-between my-5">
          <div className="flex gap-3">
            {taskFilterBtns.map((filterBtn) => {
              return (
                <TaskFilterButton key={filterBtn}>{filterBtn}</TaskFilterButton>
              );
            })}
          </div>
          <AddButton>+ Add Task</AddButton>
        </div>

        {/* Quote */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-7 my-5">
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
