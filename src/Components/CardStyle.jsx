import { motion } from "motion/react";

export default function CardStyle({ children, flex, tasks, goals, ...props }) {
  // -------------------- Contexts --------------------
  // End of contexts
  return (
    <motion.div
      {...props}
      className={` bg-white ${
        flex && "flex justify-between"
      } my-5 border border-neutral-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300`}
    >
      {tasks && tasks.length === 0 && (
        <p className="text-center p-10 text-neutral-500">
          No tasks found. Add a new task to get started!
        </p>
      )}

      {goals && goals.length === 0 && (
        <p className="text-center p-10 text-neutral-500">
          No goals found. Add a new goal to get started!
        </p>
      )}
      {children}
    </motion.div>
  );
}
