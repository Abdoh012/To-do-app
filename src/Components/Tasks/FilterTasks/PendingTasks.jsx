import { use } from "react";
import TaskSummaryCard from "../TaskSummaryCard";
import TaskContext from "@/Components/Contexts/TasksContext";

export default function PendingTasks() {

  // Contexts 
  const { pendingTasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      {pendingTasks.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
