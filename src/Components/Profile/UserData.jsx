import { use } from "react";
import { ProfileCtx } from "../Contexts/ProfileCtx";
import ActionBtn from "../ActionBtn";

export default function UserData() {
  // -------------------- Contexts --------------------
  const { name, email, handleEditProfile } = use(ProfileCtx);
  // End of contexts

  // -------------------- Component structure --------------------
  return (
    <>
      <div className="mb-2">{name}</div>
      <div className="text-neutral-600 mb-15">{email}</div>
      <ActionBtn handleClick={handleEditProfile}>Edit Profile</ActionBtn>
    </>
  );
}
