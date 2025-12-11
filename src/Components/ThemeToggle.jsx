import { useTheme } from "./ThemeProvider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

export default function ThemeToggle({ handleClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        onCheckedChange={toggleTheme}
        onClick={handleClick}
      />
    </div>
  );
}
