import { use } from "react";
import AuthButtonsContext from "../Contexts/AuthButtonsContext";

export default function Button({ children }) {
  // Context
  const { onActiveFormClick, activeAuth } = use(AuthButtonsContext);
  // End of context
  return (
    <button
      onClick={() => onActiveFormClick(children)}
      className={`${
        children.toLowerCase() === activeAuth
          ? "bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-hover-bg)] text-white"
          : "bg-white hover:bg-amber-50 text-black shadow-[0_0_1px_#00000099]"
      } flex-1 py-2 rounded-lg cursor-pointer duration-300`}
    >
      {children}
    </button>
  );
}
