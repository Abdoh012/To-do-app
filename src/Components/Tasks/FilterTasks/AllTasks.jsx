import TaskSummaryCard from "../TaskSummaryCard";

export default function AllTasks({ allTasks }) {
  return (
    <div>
      {allTasks.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
