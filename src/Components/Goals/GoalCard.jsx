import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardStyle from "../CardStyle";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { use } from "react";
import { GoalsCtx } from "../Contexts/GoalsContext";
import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";
import { motion } from "motion/react";

export default function GoalCard({
  goalId,
  title,
  description,
  date,
  subTasks,
  milestones,
  ...props
}) {
  
  // -------------------- Variables --------------------
  const completedSubTasks = subTasks.filter(
    (subTask) => subTask.completed
  ).length; // Total completed sub tasks

  const progress = ((completedSubTasks / subTasks.length) * 100).toFixed(0); // Progress percentage
  // End of variables

  // -------------------- Contexts --------------------
  const { subTaskState, handleRemoveGoal, goalState, handleEditClick } =
    use(GoalsCtx);
  // End of contexts

  // -------------------- Testing --------------------

  // End of testing

  return (
    <CardStyle {...props}>
      {/* Title, description and date of the goal */}
      <div className="">
        {/* Title and buttons */}
        <div className="mb-3 flex justify-between">
          {/* Title */}
          <p>{title}</p>
          {/* Edit and delete goal buttons */}
          <div className="flex gap-3">
            <EditBtn id={goalId} handleClick={handleEditClick}></EditBtn>
            <DeleteBtn id={goalId} handleClick={handleRemoveGoal}></DeleteBtn>
          </div>
        </div>

        {/* Description */}
        {description && <p className="text-neutral-600 mb-3">{description}</p>}

        {/* Date */}
        {date && (
          <p className="text-neutral-600">
            <FontAwesomeIcon className="me-1" icon="fa-regular fa-calendar" />
            <span>Target: {date}</span>
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="my-12">
        <div className="flex justify-between mb-3 text-neutral-600">
          <span>Progress</span>
          <span>{Number(progress) ? progress : 0}%</span>
        </div>
        <Progress
          value={Number(progress) ? progress : 0}
          className="w-[100%]"
        />
      </div>

      {/* Sub tasks section */}
      {subTasks.length > 0 && (
        <div>
          {/* Sub tasks label */}
          <div className="mb-3 text-neutral-800">Sub-Tasks:</div>

          {/* Sub tasks */}
          {subTasks.map((subTask) => {
            return (
              <div key={subTask.id} className="flex gap-2 ms-6 mb-2">
                <Checkbox
                  id={`subtask-${subTask.id}`}
                  checked={subTask.completed}
                  onClick={() => goalState(goalId)}
                  onCheckedChange={(checked) => {
                    checked
                      ? subTaskState(goalId, subTask.id, true)
                      : subTaskState(goalId, subTask.id, false);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={`subtask-${subTask.id}`}
                  className={`${
                    subTask.completed
                      ? "line-through text-neutral-500"
                      : "text-neutral-700"
                  }  font-normal text-[15px]`}
                >
                  {subTask.title}
                </Label>
              </div>
            );
          })}
        </div>
      )}

      {/* Mile stones section */}
      {milestones.length > 0 && (
        <div className="flex gap-2 mt-10">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-neutral-200 text-xs font-medium rounded-md py-0.5 inline-flex justify-center items-center px-2"
            >
              <FontAwesomeIcon icon="fa-solid fa-trophy" />
              <span className="ms-1">{milestone.title}</span>
            </div>
          ))}
        </div>
      )}
    </CardStyle>
  );
}

export const MotionGoalCard = motion.create(GoalCard);
