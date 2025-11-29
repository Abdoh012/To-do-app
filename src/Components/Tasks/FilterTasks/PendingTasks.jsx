import TaskSummaryCard from "../TaskSummaryCard";

export default function PendingTasks({ pending }) {
  return (
    <div>
      {pending.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
