import { use } from "react";
import TaskContext from "@/Components/Contexts/TasksContext";
import CardStyle from "@/Components/CardStyle";
import { AnimatePresence } from "motion/react";
import { MotionTaskCard } from "../TaskCard";

export default function CompletedTasks() {
  // Contexts
  const { completedTasks } = use(TaskContext);

  // End of contexts

  // Component structure
  return (
    <div>
      <AnimatePresence>
        {completedTasks.length === 0 && <CardStyle tasks={completedTasks} />}
        {completedTasks.map((task) => {
          return (
            <MotionTaskCard
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
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
