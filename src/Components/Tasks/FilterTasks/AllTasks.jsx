import { use } from "react";
import TaskSummaryCard from "../TaskSummaryCard";
import TaskContext from "@/Components/Contexts/TasksContext";

export default function AllTasks() {
  // Contexts
  const { tasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      {tasks.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
