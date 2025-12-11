import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useRef, useState } from "react";
import { toast } from "sonner";

export const ProfileCtx = createContext({
  userNameRef: null,
  userEmailRef: null,
  name: null,
  email: null,
  shortcutName: null,
  profile: null,
  handleEditProfile: null,
  handleSaveProfile: null,
  handleCancelEdit: null,
  handleSwitchTheme: null,
  handleSwitchNotification: null,
});

export default function ProfileWrapper({ children }) {
  // -------------------- States --------------------
  const [userInfo, setUserInfo] = useState({
    name: "Abdelrahman Mohammed",
    email: "abdoh@example.com",
  });

  const [notifications, setNotifications] = useState("Enabled");
  // End of states

  // -------------------- Refs --------------------
  const userName = useRef();
  const userEmail = useRef();
  // End of refs
  const [profile, setProfile] = useState("info");
  // End of states

  // -------------------- Variables --------------------
  const nameArray = userInfo.name.split(" ");
  const shortcutName = nameArray[0][0] + nameArray[1][0];

  // End of variables

  // -------------------- Functions --------------------

  // Notification on changing theme
  function handleSwitchThemeClick(theme) {
    toast.success(`Switched to ${theme === "light" ? "dark" : "light"} mode`, {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });
  }

  // Notification on changing notifications
  function handleSwitchNotificationClick() {
    setNotifications((prev) => (prev === "Enabled" ? "Disabled" : "Enabled"));
    toast.success(`Notifications ${notifications}`, {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });
  }

  // Go to edit profile
  function handleEditProfileClick() {
    setProfile("edit");
  }

  // Save new profile info
  function handleSaveProfileClick() {
    setProfile("info");

    // Notification updated successfully
    toast.success("Profile updated successfully! 🎉", {
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#000000" }}
        />
      ),
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    });

    // Update user info
    setUserInfo(() => {
      return {
        name: userName.current.value,
        email: userEmail.current.value,
      };
    });
  }

  // Cancel edit profile info
  function handleCancelEditClick() {
    setProfile("info");
  }
  // End of functions

  // -------------------- Contexts --------------------
  const ProfileCtxValue = {
    userNameRef: userName,
    userEmailRef: userEmail,
    name: userInfo.name,
    email: userInfo.email,
    shortcutName: shortcutName,
    profile: profile,
    handleEditProfile: handleEditProfileClick,
    handleSaveProfile: handleSaveProfileClick,
    handleCancelEdit: handleCancelEditClick,
    handleSwitchTheme: handleSwitchThemeClick,
    handleSwitchNotification: handleSwitchNotificationClick,
  };
  // End of contexts

  // -------------------- COMPONENT STRUCTURE --------------------
  return <ProfileCtx value={ProfileCtxValue}>{children}</ProfileCtx>;
}
