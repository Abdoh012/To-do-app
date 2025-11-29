import { useRef, useState } from "react";
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
import AddPopup from "./AddPopup";
import TaskContext from "../Contexts/TasksContext";

// Structure
export default function DashBoard() {
  // Refs
  const taskText = useRef();
  const taskDescription = useRef();
  const taskCategory = useRef();
  const taskDate = useRef();
  // End of refs

  // States
  const [activeBtn, setActiveBtn] = useState("All"); // Active filter tasks button state

  const [tasks, setTasks] = useState([]); // Tasks state
  const [showPopup, setShowPopup] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  // End of states

  // Variables

  // Number of all tasks
  const numberOfTasks = tasks.length;

  // Completed tasks
  const completedTasks = tasks.filter((task) => task.completed);
  const numberOfCompletedTasks = tasks.filter((task) => task.completed).length;

  // Pending tasks
  const pendingTasks = tasks.filter((task) => task.pending);
  const numberOfPendingTasks = tasks.filter((task) => task.pending).length;

  // Todays tasks
  const date = new Date();
  const todaysDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const todaysTasks = tasks.filter((task) => task.taskDate === todaysDate);

  // Random number
  const randomNumber = Date.now() * Math.random();

  // End of variables

  // Functions

  // Show the a specific section of tasks (all, today, etc...)
  function setActiveTasksSection(sectionBtn) {
    setActiveBtn(sectionBtn);
  }

  // Show popup
  function handleAddTaskClick() {
    setShowAnimation(true);
    setShowPopup(true);
  }

  // Hide Popup
  function handleCancelBtnClick() {
    setShowAnimation(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 500);
  }

  // Add tasks
  function handleAddNewTaskClick(e) {
    // No form actions onClicking the button
    e.preventDefault();

    // Hide the add task popup
    setShowAnimation(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 500);

    // Set add tasks state
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          id: randomNumber,
          completed: false,
          pending: true,
          taskText: taskText.current.value,
          taskDescription: taskDescription.current.value,
          taskCategory: taskCategory.current.value,
          taskDate: taskDate.current.value,
          animation: false,
        },
      ];
    });
  }

  // Remove task
  function handleRemoveTask(id) {
    // Remove task with animation
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        // If the task will be removed set the animation to true before deleting it
        if (task.id === id) {
          return { ...task, animation: true };
        }
        return task;
      });
    });
    setTimeout(() => {
      setTasks((prevTasks) => {
        return prevTasks.filter((task) => task.id !== id);
      });
    }, 500);
  }

  // Set task as completed or not completed
  function taskState(id, state) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        // If the task is checked from the checkbox set the task as completed if it is not set it as not completed
        if (task.id === id) {
          task.pending = !state;
          task.completed = state;
        }
        return task;
      });
    });
  }
  // End of functions

  // Context values
  const TaskContextVal = {
    taskTextRef: taskText,
    taskDescriptionRef: taskDescription,
    taskCategoryRef: taskCategory,
    taskDateRef: taskDate,
    handleAddNewTaskClick: handleAddNewTaskClick,
    taskState: taskState,
    handleRemoveTask: handleRemoveTask,
  };
  // End of context values

  // Component structure
  return (
    <>
      {/* Add task popup */}
      <TaskContext value={TaskContextVal}>
        {showPopup && (
          <AddPopup
            handleClick={handleCancelBtnClick}
            animation={showAnimation ? "animate__fadeIn" : "animate__fadeOut"}
          ></AddPopup>
        )}
      </TaskContext>

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
                <TaskFilterButton
                  key={filterBtn}
                  activeBtn={activeBtn}
                  handleFilterBtnClick={setActiveTasksSection}
                >
                  {filterBtn}
                </TaskFilterButton>
              );
            })}
          </div>
          <AddButton handleClick={handleAddTaskClick}>+ Add Task</AddButton>
        </div>

        {/* Quote */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-7 my-5">
          <i>"The secret of getting ahead is getting started." — Mark Twain</i>
        </div>

        {/* (AllTasks or CompletedTask or PendingTasks or TodayTasks) page */}
        <TaskContext value={TaskContextVal}>
          {activeBtn === "All" ? (
            <AllTasks allTasks={tasks}></AllTasks>
          ) : activeBtn === "Completed" ? (
            <CompletedTasks completed={completedTasks}></CompletedTasks>
          ) : activeBtn === "Pending" ? (
            <PendingTasks pending={pendingTasks}></PendingTasks>
          ) : activeBtn === "Today" ? (
            <TodayTasks today={todaysTasks}></TodayTasks>
          ) : null}
        </TaskContext>
      </PagesContainer>
    </>
  );
}
