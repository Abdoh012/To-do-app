import TaskSummaryCard from "../TaskSummaryCard";

export default function CompletedTasks({ completed }) {
  return (
    <div>
      {completed.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
