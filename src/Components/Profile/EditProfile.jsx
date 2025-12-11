import { use } from "react";
import ActionBtn from "../ActionBtn";
import { ProfileCtx } from "../Contexts/ProfileCtx";
import Input from "../AuthForm/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditProfile() {
  // -------------------- Contexts --------------------
  const {
    name,
    email,
    handleSaveProfile,
    handleCancelEdit,
    userNameRef,
    userEmailRef,
  } = use(ProfileCtx);
  // End of contexts
  return (
    <>
      {/* User name */}
      <Input
        ref={userNameRef}
        value={name}
        icon="fa-regular fa-user"
        margin="mb-3"
        id="Full Name"
        font="font-semibold"
      ></Input>

      {/* User email */}
      <Input
        ref={userEmailRef}
        value={email}
        icon="fa-regular fa-envelope"
        margin="mb-3"
        id="Full Name"
        font="font-semibold"
      ></Input>

      <div className="w-full grid grid-cols-2 gap-3">
        <ActionBtn handleClick={handleSaveProfile}>Save Changes</ActionBtn>

        {/* Cancel edit button */}
        <ActionBtn
          style="bg-white text-lack hover:bg-[#e9ebef] border border-neutral-300"
          handleClick={handleCancelEdit}
        >
          Cancel
        </ActionBtn>
      </div>
    </>
  );
}
