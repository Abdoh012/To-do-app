import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useEffect, useRef, useState } from "react";
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
  const [editingId, setEditingId] = useState();
  // End of states

  // -------------------- Variables --------------------
  const randomNumber = Date.now() * Math.random(); // Random number

  // Number of all tasks
  const numberOfTasks = tasks.length;

  // Completed tasks

  const completedTasks = tasks.filter((task) => task.completed === true);
  const numberOfCompletedTasks = tasks.filter((task) => task.completed).length;

  // Pending tasks
  const pendingTasks = tasks.filter((task) => task.pending);
  const numberOfPendingTasks = tasks.filter((task) => task.pending).length;

  // Todays tasks
  const date = new Date();
  const todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;

  const todaysTasks = tasks.filter((task) => task.taskDate === todaysDate);

  // End of variables

  // -------------------- REFS --------------------
  const taskText = useRef();
  const taskDescription = useRef();
  const taskCategory = useRef();
  const taskDate = useRef();
  // End of refs section

  // -------------------- UseEffect --------------------

  // Add overflow hidden class when the popup is opened
  useEffect(() => {
    if (showPopup.addPopup || showPopup.editPopup) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [showPopup]);
  // End of useEffect

  // Functions

  // Show the specific section of tasks (all, today, etc...)
  function setActiveTasksSection(sectionBtn) {
    setActiveBtn(sectionBtn);
  }

  // Show add task popup
  function handleAddTaskClick() {
    // Focus on title after opening the popup
    // Time out because react needs some time to see the elements in something after it is opened
    setTimeout(() => {
      taskText.current.focus();
    }, 1);

    // set add popup to true to open it
    setShowPopup((prev) => ({
      ...prev,
      addPopup: true,
    }));
  }

  // Hide Popup
  function handleCancelBtnClick() {
    setShowPopup(() => ({
      addPopup: false,
      editPopup: false,
    }));
  }

  // Show edit task popup and set the editing id
  function handleEditClick(id) {
    // Set editing id to clicked task id
    setEditingId(id);

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
          return { ...task, pending: !state, completed: state };
        }
        return task;
      });
    });
  }

  // Add tasks
  function handleAddNewTaskClick(e) {
    e.preventDefault(); // stop default submit

    // get the closest form element
    const form = e.target.closest("form");

    // run HTML5 validation FIRST
    if (!form.checkValidity()) {
      form.reportValidity();
    }

    // Check if title is empty
    if (!taskText.current.value) {
      toast.info("Please enter a task title first", {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
      return;
    }

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
    setShowPopup(false);

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

    
    // Close popup

    setShowPopup((prev) => ({
      ...prev,
      editPopup: false,
    }));

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

    // Remove the task
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  }

  // End of functions

  // -------------------- Context values --------------------
  const TaskContextVal = {
    activeBtn: activeBtn,
    showPopup: showPopup,
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
