import { use } from "react";
import PagesContainer from "../PagesContainer";
import TopSection from "../TopSection";
import { GoalsCtx } from "../Contexts/GoalsContext";
import { goalCards } from "@/util/data";
import AddButton from "../AddButton";
import { MotionGoalCard } from "./GoalCard";
import { AnimatePresence, motion } from "motion/react";
import CardStyle from "../CardStyle";
import GoalPopup from "./GoalPopup";

import { Toaster } from "@/components/ui/sonner";

export default function Goals() {
  // -------------------- Contexts --------------------
  const {
    goals,
    numberOfAllGoals,
    numberOfCompletedGoals,
    avgProgress,
    handleAddGoalClick,
    showPopup,
    editingId,
  } = use(GoalsCtx);
  // End of contexts

  // Component structure
  return (
    <>
      {/* Popup */}
      <AnimatePresence>
        {/* Add goal popup */}
        {showPopup.addPopup ? (
          <GoalPopup>Add New Goal</GoalPopup>
        ) : // Edit goal popup
        showPopup.editPopup ? (
          <GoalPopup
            goalText={goals.find((goal) => goal.key === editingId)?.title}
            goalDescription={
              goals.find((goal) => goal.key === editingId)?.description
            }
            goalDate={goals.find((goal) => goal.key === editingId)?.date}
            goalSubTasks={goals.find((goal) => goal.key === editingId)?.subTasks}
          >
            Edit Goal
          </GoalPopup>
        ) : undefined}
      </AnimatePresence>

      {/* Page content */}
      <PagesContainer>
        {/* Notification */}
        <div>
          <Toaster />
        </div>

        {/* Top section (title and stats cards) */}
        <TopSection
          cards={goalCards}
          all={numberOfAllGoals}
          avgProgress={avgProgress}
          completed={numberOfCompletedGoals}
        >
          Set and achieve your long-term objectives
        </TopSection>

        {/* Add goals button */}
        <AddButton handleClick={handleAddGoalClick}>+ Add Goal</AddButton>

        {/* Goal cards */}
        <AnimatePresence>
          {goals.length === 0 && <CardStyle goals={goals}></CardStyle>}
          {goals.map((goal) => (
            <MotionGoalCard
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={goal.key}
              goalId={goal.key}
              title={goal.title}
              description={goal.description}
              date={goal.date}
              subTasks={goal.subTasks}
              milestones={goal.milestones}
            />
          ))}
        </AnimatePresence>
      </PagesContainer>
    </>
  );
}
