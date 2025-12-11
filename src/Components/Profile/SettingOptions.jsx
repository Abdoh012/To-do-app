import { use } from "react";
import ThemeToggle from "../ThemeToggle";
import { ProfileCtx } from "../Contexts/ProfileCtx";
import { Switch } from "@/components/ui/switch";

export default function SettingOptions({ title, description, icon }) {
  // -------------------- Contexts --------------------
  const { handleSwitchNotification, notifications } = use(ProfileCtx);
  // End of contexts

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
          {title === "Theme" ? (
            <ThemeToggle></ThemeToggle>
          ) : (
            <Switch
              onCheckedChange={handleSwitchNotification}
              checked={notifications === "Enabled" ? false : true}
            />
          )}
        </div>
      </div>
    </>
  );
}
