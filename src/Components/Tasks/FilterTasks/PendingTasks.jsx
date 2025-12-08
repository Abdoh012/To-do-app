import { use } from "react";
import { MotionTaskCard } from "../TaskCard";
import TaskContext from "@/Components/Contexts/TasksContext";
import CardStyle from "@/Components/CardStyle";

import { AnimatePresence } from "motion/react";

export default function PendingTasks() {
  // Contexts
  const { pendingTasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <div>
      <AnimatePresence>
        {pendingTasks.length === 0 && <CardStyle tasks={pendingTasks} />}
        {pendingTasks.map((task) => {
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
