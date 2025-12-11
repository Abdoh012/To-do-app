import { use } from "react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { ProfileCtx } from "./Contexts/ProfileCtx";

export default function ThemeToggle({}) {
  // -------------------- States --------------------
  const { theme, toggleTheme } = useTheme();
  // End of states

  // -------------------- Contexts --------------------
  const { handleSwitchTheme } = use(ProfileCtx);
  // End of contexts

  // -------------------- Component structure --------------------
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        onCheckedChange={toggleTheme}
        checked={theme === "dark" ? true : false}
        onClick={() => handleSwitchTheme(theme)}
      />
    </div>
  );
}
