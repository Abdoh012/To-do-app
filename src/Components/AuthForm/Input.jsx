import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "../AddButton";

export default function Input({
  type,
  required,
  placeholder,
  ref,
  id,
  font,
  margin,
  value,
  addBtn,
  handleClick,
  icon,
}) {
  return (
    <div className={`${placeholder !== "sub tasks" && "mb-5"} w-full`}>
      <label htmlFor={id} className={`block mb-1 ${font} ${margin && margin}`}>
        {id}
      </label>
      <div
      className="flex items-center"
        style={addBtn && { display: "flex", alignItems: "stretch", gap: "5px", position: "relative" }}
      >
        {icon && (
          <span className="absolute ms-3 text-neutral-400">
            <FontAwesomeIcon icon={`${icon}`}></FontAwesomeIcon>
          </span>
        )}
        {/* Input */}
        <input
          defaultValue={value}
          ref={ref}
          required={required ? required : false}
          type={type}
          id={id}
          placeholder={placeholder && `Enter your ${placeholder}`}
          className={`${icon && "ps-10"} input-focus px-4 py-3 w-full rounded-sm duration-300 bg-[#f3f3f5]`}
        />

        {/* Add button */}
        {addBtn && (
          <AddButton handleClick={handleClick} height={true}>
            Add
          </AddButton>
        )}
      </div>
    </div>
  );
}
