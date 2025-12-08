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
}) {
  return (
    <div className={`${placeholder !== "sub tasks" && "mb-5"}`}>
      <label htmlFor={id} className={`block mb-1 ${font} ${margin && margin}`}>
        {id}
      </label>
      <div
        style={addBtn && { display: "flex", alignItems: "stretch", gap: "5px" }}
      >
        {/* Input */}
        <input
          defaultValue={value}
          ref={ref}
          required={required ? required : false}
          type={type}
          id={id}
          placeholder={`Enter your ${placeholder}`}
          className="input-focus px-4 py-3 w-full rounded-sm duration-300 bg-[#f3f3f5]"
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
