import { use } from "react";
import TaskSummaryCard from "../TaskSummaryCard";
import TaskContext from "@/Components/Contexts/TasksContext";

export default function CompletedTasks() {

  // Contexts
  const { completedTasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      {completedTasks.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
