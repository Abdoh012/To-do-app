import { use } from "react";
import CardStyle from "../CardStyle";
import { ProfileCtx } from "../Contexts/ProfileCtx";
import EditProfile from "./EditProfile";
import UserData from "./UserData";
import SettingOptions from "./SettingOptions";
import { useTheme } from "../ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileInfo() {
  // -------------------- States --------------------
  const { theme, toggleTheme } = useTheme({});
  // End of states

  // -------------------- Contexts --------------------
  const { shortcutName, profile, handleSwitchTheme,handleSwitchNotification } = use(ProfileCtx);
  // End of contexts

  // -------------------- Component structure --------------------
  return (
    <>
      <CardStyle>
        <>
          {/* User info */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center mb-5 text-white bg-emerald-500 rounded-full w-25 h-25 text-lg">
              {shortcutName}
            </div>

            {/* Show user data or edit user data */}
            {profile === "info" ? <UserData></UserData> : <EditProfile />}
          </div>
        </>
      </CardStyle>

      {/* Settings */}
      <CardStyle>
        <h3 className="mb-10">Settings</h3>

        {/* Theme */}
        <SettingOptions
          title="Theme"
          description={theme === "light" ? "Light Mode" : "Dark Mode"}
          icon={
            theme === "light" ? (
              <FontAwesomeIcon
                className="text-amber-500"
                icon="fa-solid fa-sun"
              />
            ) : (
              <FontAwesomeIcon
                className="text-blue-500"
                icon="fa-regular fa-moon"
              />
            )
          }
          handleClick={() => handleSwitchTheme(theme)}
        />

        {/* Notifications */}
        <SettingOptions
          title="Notifications"
          description="Receive task and habit reminders"
          icon={
            <FontAwesomeIcon
              className="text-emerald-500"
              icon="fa-regular fa-bell"
            />
          }
          handleClick={handleSwitchNotification}
        />
      </CardStyle>
    </>
  );
}
