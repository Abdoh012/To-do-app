import TaskContext from "@/Components/Contexts/TasksContext";
import { AnimatePresence } from "motion/react";
import { MotionTaskCard } from "../TaskCard";
import CardStyle from "@/Components/CardStyle";
import { use } from "react";

export default function TodayTasks() {
  // Contexts
  const { todaysTasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      <AnimatePresence>
        {todaysTasks.length === 0 && <CardStyle tasks={todaysTasks} />}
        {todaysTasks.map((task) => {
          return (
            <MotionTaskCard
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              key={task.id}
              {...task}
            ></MotionTaskCard>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
