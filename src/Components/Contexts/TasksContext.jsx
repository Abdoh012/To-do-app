import { createContext } from "react";

const TaskContext = createContext({
  taskTextRef: null,
  taskDescriptionRef: null,
  taskDateRef: null,
  taskCategoryRef: null,
  handleAddNewTaskClick: null,
  taskState: null,
  handleRemoveTask: null,
});
export default TaskContext;
