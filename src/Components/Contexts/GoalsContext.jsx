import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const GoalsCtx = createContext({
  subTasks: null,
  milestones: null,
  goals: null,
  goalTextRef: null,
  goalDescriptionRef: null,
  goalDateRef: null,
  goalSubTasksRef: null,
  goalMilestoneRef: null,
  showPopup: null,
  numberOfAllGoals: null,
  numberOfCompletedGoals: null,
  avgProgress: null,
  subTaskState: null,
  handleAddSubTask: null,
  handleRemoveSubTask: null,
  handleAddMilestone: null,
  handleRemoveMilestone: null,
  handleAddGoalClick: null,
  handleEditClick: null,
  handleCancelBtnClick: null,
  handleAddNewGoalClick: null,
  handleEditGoalClick: null,
  handleRemoveGoal: null,
  goalState: null,
  editingId: null,
});

export default function GoalsWrapper({ children }) {
  // -------------------- REFS --------------------
  const goalText = useRef();
  const goalDescription = useRef();
  const goalDate = useRef();
  const goalSubTask = useRef();
  const goalMilestone = useRef();
  // End of refs section

  // -------------------- STATES --------------------
  const [showPopup, setShowPopup] = useState({
    addPopup: false,
    editPopup: false,
  });
  const [subTasks, setSubTasks] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [editingId, setEditingId] = useState();
  const [goals, setGoals] = useState([]); // Tasks state
  // End of states

  // -------------------- Variables --------------------

  // Random number
  const randomNumber = Date.now() * Math.random(); // Random number

  // All goals
  const numberOfAllGoals = goals.length;

  // Completed goals
  const numberOfCompletedGoals = goals.filter((goal) => goal.completed).length;

  // Calculate Progress
  const totalSubTasks = goals.flatMap((goal) => goal.subTasks).length; // Total sub tasks in all goals
  const totalCompletedSubTasks = goals.flatMap((goal) =>
    goal.subTasks.filter((goal) => goal.completed)
  ).length; // Total completed sub tasks in all goals

  // Avg progress
  const avgProgress = totalSubTasks
    ? ((totalCompletedSubTasks / totalSubTasks) * 100).toFixed(0)
    : 0;

  // End of variables

  // -------------------- UseEffect --------------------

  // Add overflow hidden class when the popup is opened
  useEffect(() => {
    if (showPopup.addPopup || showPopup.editPopup) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [showPopup]);
  // End of useEffect

  // -------------------- Functions --------------------

  // Open popup onClicking add goal
  function handleAddGoalClick() {
    // Focus on title after opening the popup
    // Time out because react needs some time to see the elements in something after it is opened
    setTimeout(() => {
      goalText.current.focus();
    }, 1);

    // set add popup to true to display it
    setShowPopup((prev) => ({
      ...prev,
      addPopup: true,
    }));
  }

  // Hide Popup onClicking x
  function handleCancelBtnClick() {
    setShowPopup(() => ({
      addPopup: false,
      editPopup: false,
    }));
  }

  // Show edit goal popup and set the editing id
  function handleEditClick(id) {
    // Set editing id to clicked task id
    setEditingId(id);

    // Add old sub tasks of the clicked goals to sub tasks state
    setSubTasks(() => {
      const goal = goals.filter((goal) => goal.key === id);
      return [...goal[0].subTasks];
    });

    // Add old milestones of the clicked goals to sub tasks state
    setMilestones(() => {
      const goal = goals.filter((goal) => goal.key === id);
      return [...goal[0].milestones];
    });

    // Show popup
    setShowPopup((prev) => ({
      ...prev,
      editPopup: true,
    }));
  }

  // Add subtasks
  function handleAddSubTasksClick() {
    if (!goalSubTask.current.value) {
      toast.info("Please enter a valid sub task", {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
      return;
    }
    setSubTasks((prevSubTasks) => [
      ...prevSubTasks,
      {
        id: randomNumber,
        title: goalSubTask.current.value,
        completed: false,
      },
    ]);
  }

  // Remove sub tasks
  function handleRemoveSubTaskClick(id) {
    setSubTasks((prevSubTasks) =>
      prevSubTasks.filter((subTask) => subTask.id !== id)
    );
  }

  // Add milestones
  function handleAddMilestonesClick() {
    if (!goalMilestone.current.value) {
      toast.info("Please enter a valid milestone", {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
      return;
    }
    setMilestones((prevMilestones) => [
      ...prevMilestones,
      {
        id: randomNumber,
        title: goalMilestone.current.value,
      },
    ]);
  }

  // Remove milestones
  function handleRemoveMilestoneClick(id) {
    setMilestones((prevMilestones) =>
      prevMilestones.filter((milestone) => milestone.id !== id)
    );
  }

  // Set sub tasks as completed or not completed
  function subTaskState(goalId, subTaskId, state) {
    setGoals((prevGoals) => {
      return prevGoals.map((goal) => {
        // Set the state of the sub tasks
        goal.subTasks.map((subTask) => {
          if (subTask.id === subTaskId && goal.key === goalId) {
            subTask.completed = state;
          }
        });
        return goal;
      });
    });
  }

  // Set goals as completed or not
  function goalState(id) {
    setTimeout(() => {
      setGoals((prevGoals) => {
        return prevGoals.map((goal) => {
          if (
            goal.key === id &&
            goal.subTasks.every((subTask) => subTask.completed)
          ) {
            return {
              ...goal,
              completed: true,
            };
          } else if (
            goal.key === id &&
            !goal.subTasks.every((subTask) => subTask.completed)
          ) {
            return {
              ...goal,
              completed: false,
            };
          }
          return goal;
        });
      });
    }, 1);
  }

  // Add new goals
  function handleAddNewGoalClick(e) {
    e.preventDefault(); // stop default submit

    // get the closest form element
    const form = e.target.closest("form");

    // run HTML5 validation FIRST
    if (!form.checkValidity()) {
      form.reportValidity();
    }

    // Check if title is empty
    if (!goalText.current.value) {
      toast.info("Please enter a goal title first", {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
      return;
    }

    // Set sub tasks state to an empty array
    setTimeout(() => {
      setSubTasks([]);
      setMilestones([]);
    }, 1);

    // Add notification with text added successfully
    toast.success("Goal added successfully! 🎉", {
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

    // Set add goals state
    setGoals((prevGoals) => {
      return [
        ...prevGoals,
        {
          key: randomNumber,
          completed: false,
          title: goalText.current.value,
          description: goalDescription.current.value,
          date: goalDate.current.value,
          subTasks: subTasks,
          milestones: milestones,
        },
      ];
    });
  }

  // Edit a goal
  function handleEditGoalClick(e) {
    e.preventDefault(); // stop default submit

    // Update the state of completed goals
    goalState(editingId);

    // Add notification with text updated
    toast.success("Goal updated successfully! ✏️", {
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
    setGoals((prevGoals) => {
      return prevGoals.map((goal) => {
        if (goal.key === editingId) {
          return {
            ...goal,
            title: goalText.current.value,
            description: goalDescription.current.value,
            date: goalDate.current.value,
            subTasks: [...subTasks],
            milestones: [...milestones],
          };
        } else return goal;
      });
    });
  }

  // Delete goals
  function handleRemoveGoal(id) {
    // Add notification with text removed
    toast.success("Goal deleted ❌", {
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

    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.key !== id);
    });
  }
  // End of functions

  // -------------------- Contexts --------------------
  const goalsCtxValue = {
    subTasks: subTasks,
    milestones: milestones,
    goals: goals,
    goalTextRef: goalText,
    goalDescriptionRef: goalDescription,
    goalDateRef: goalDate,
    goalSubTasksRef: goalSubTask,
    goalMilestoneRef: goalMilestone,
    numberOfAllGoals: numberOfAllGoals,
    numberOfCompletedGoals: numberOfCompletedGoals,
    avgProgress: avgProgress,
    subTaskState: subTaskState,
    goalState: goalState,
    handleAddSubTask: handleAddSubTasksClick,
    handleRemoveSubTask: handleRemoveSubTaskClick,
    handleAddMilestone: handleAddMilestonesClick,
    handleRemoveMilestone: handleRemoveMilestoneClick,
    handleAddGoalClick: handleAddGoalClick,
    handleEditClick: handleEditClick,
    handleCancelBtnClick: handleCancelBtnClick,
    handleAddNewGoalClick: handleAddNewGoalClick,
    handleEditGoalClick: handleEditGoalClick,
    handleRemoveGoal: handleRemoveGoal,
    showPopup: showPopup,
    editingId: editingId,
  };
  return <GoalsCtx value={goalsCtxValue}>{children}</GoalsCtx>;
}
