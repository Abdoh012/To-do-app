import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardStyle from "../CardStyle";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../ThemeProvider";

export default function SettingOptions({ title, description, icon, handleClick }) {
  // -------------------- States --------------------
  const { theme, toggleTheme } = useTheme({});
  // End of states

  // -------------------- Component structure --------------------
  return (
    <>
      <div className="bg-neutral-50 rounded-md p-5 flex justify-between items-center mb-5">
        {/* Theme icon */}
        <div className="flex-1">{icon}</div>

        {/* Theme text */}
        <div className="flex-20">
          <p className="mb-1">{title}</p>
          <p className="text-neutral-600">{description}</p>
        </div>

        {/* Theme button */}
        <div className="flex-1">
          <ThemeToggle handleClick={handleClick}></ThemeToggle>
        </div>
      </div>
    </>
  );
}
