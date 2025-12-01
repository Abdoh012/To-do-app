import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useRef, useState } from "react";
import { toast } from "sonner";

const TaskContext = createContext();

export function TaskWrapper({ children }) {
  // -------------------- STATES --------------------
  const [activeBtn, setActiveBtn] = useState("All"); // Active filter tasks button state
  const [tasks, setTasks] = useState([]); // Tasks state
  const [showPopup, setShowPopup] = useState({
    addPopup: false,
    editPopup: false,
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [editingId, setEditingId] = useState();
  // End of states

  // -------------------- Variables --------------------
  const randomNumber = Date.now() * Math.random(); // Random number

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
  const todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;
  console.log(todaysDate);
  console.log(tasks[0].taskDate);

  const todaysTasks = tasks.filter((task) => task.taskDate === todaysDate);
  console.log(todaysTasks);

  // End of variables

  // -------------------- REFS --------------------
  const taskText = useRef();
  const taskDescription = useRef();
  const taskCategory = useRef();
  const taskDate = useRef();
  // End of refs section

  // Functions

  // Show the a specific section of tasks (all, today, etc...)
  function setActiveTasksSection(sectionBtn) {
    setActiveBtn(sectionBtn);
  }

  // Show add task popup
  function handleAddTaskClick() {
    setShowAnimation(true);
    setShowPopup((prev) => ({
      ...prev,
      addPopup: true,
    }));
  }

  // Hide Popup
  function handleCancelBtnClick() {
    setShowAnimation(false);
    setTimeout(() => {
      setShowPopup(() => ({
        addPopup: false,
        editPopup: false,
      }));
    }, 500);
  }

  // Show edit task popup and set the editing id
  function handleEditClick(id) {
    // Set editing id to clicked task id
    setEditingId(id);

    // Show animation on opening popup
    setShowAnimation(true);

    // Show popup
    setShowPopup((prev) => ({
      ...prev,
      editPopup: true,
    }));
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

  // Add tasks
  function handleAddNewTaskClick(e) {
    // No form actions onClicking the button
    e.preventDefault();

    // Add notification with text added successfully
    toast.success("Task added successfully! 🎉", {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });

    // Hide the add task popup after 0.5 second
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

  // Edit task
  function handleEditTaskClick(e) {
    e.preventDefault();

    // Add notification with text updated
    toast.success("Task updated successfully! ✏️", {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });

    // Hide animation on closing popup
    setShowAnimation(false);

    // Close popup
    setTimeout(() => {
      setShowPopup((prev) => ({
        ...prev,
        editPopup: false,
      }));
    }, 500);

    // Edit task based on id
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === editingId) {
          return {
            ...task,
            taskText: taskText.current.value,
            taskDescription: taskDescription.current.value,
            taskCategory: taskCategory.current.value,
            taskDate: taskDate.current.value,
          };
        } else return task;
      });
    });
  }

  // Remove task
  function handleRemoveTask(id) {
    // Add notification with text removed
    toast.success("Task deleted ❌", {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });

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

  // End of functions

  // -------------------- Context values --------------------
  const TaskContextVal = {
    activeBtn: activeBtn,
    showPopup: showPopup,
    showAnimation: showAnimation,
    editingId: editingId,
    tasks: tasks,
    completedTasks: completedTasks,
    todaysTasks: todaysTasks,
    pendingTasks: pendingTasks,
    numberOfTasks: numberOfTasks,
    numberOfCompletedTasks: numberOfCompletedTasks,
    numberOfPendingTasks: numberOfPendingTasks,
    taskTextRef: taskText,
    taskDescriptionRef: taskDescription,
    taskCategoryRef: taskCategory,
    taskDateRef: taskDate,
    taskState: taskState,
    handleAddTaskClick: handleAddTaskClick,
    handleAddNewTaskClick: handleAddNewTaskClick,
    handleEditTaskClick: handleEditTaskClick,
    handleEditClick: handleEditClick,
    handleRemoveTaskClick: handleRemoveTask,
    handleEdit: handleEditClick,
    handleRemoveTask: handleRemoveTask,
    handleCancelBtnClick: handleCancelBtnClick,
    handleFilterBtnClick: setActiveTasksSection,
  };
  // End of context values

  // -------------------- COMPONENT STRUCTURE --------------------
  return <TaskContext value={TaskContextVal}>{children}</TaskContext>;
}

export default TaskContext;
