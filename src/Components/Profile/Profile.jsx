import { Toaster } from "sonner";
import Header from "../Header";
import PagesContainer from "../PagesContainer";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
  return (
    <PagesContainer padding={"200px"}>
      {/* Notification */}
      <div>
        <Toaster />
      </div>

      {/* Header */}
      <Header title="Profile">
        Manage your account settings and preferences
      </Header>

      {/* Profile info */}
      <ProfileInfo></ProfileInfo>
      {/* <ThemeToggle></ThemeToggle> */}
    </PagesContainer>
  );
}
