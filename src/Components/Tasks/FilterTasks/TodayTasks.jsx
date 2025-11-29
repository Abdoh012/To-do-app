import TaskSummaryCard from "../TaskSummaryCard";

export default function TodayTasks({ today }) {
  return (
    <div>
      {today.map((task) => {
        return <TaskSummaryCard key={task.id} {...task}></TaskSummaryCard>;
      })}
    </div>
  );
}
