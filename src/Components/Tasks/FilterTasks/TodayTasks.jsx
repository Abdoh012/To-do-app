import TaskContext from "@/Components/Contexts/TasksContext";
import TaskSummaryCard from "../TaskSummaryCard";
import { use } from "react";

export default function TodayTasks() {
  // Contexts
  const { todaysTasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      {todaysTasks.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
