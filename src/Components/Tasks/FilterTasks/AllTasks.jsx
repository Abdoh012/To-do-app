import { use } from "react";
import { MotionTaskCard } from "../TaskCard";
import TaskContext from "@/Components/Contexts/TasksContext";
import CardStyle from "@/Components/CardStyle";

import { AnimatePresence } from "motion/react";

export default function AllTasks() {
  // -------------------- Contexts --------------------
  const { tasks } = use(TaskContext);
  // End of contexts

  // Component structure
  return (
    <AnimatePresence>
      {tasks.length === 0 && <CardStyle tasks={tasks} />}
      {tasks.map((task) => {
        return (
          <MotionTaskCard
            key={task.id}
            initial={{ opacity: 0 }}
            animate={
              task.completed
                ? { opacity: 0.6, scale: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0 }}
            {...task}
          ></MotionTaskCard>
        );
      })}
    </AnimatePresence>
  );
}
