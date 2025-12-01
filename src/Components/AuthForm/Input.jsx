export default function Input({
  type,
  required,
  placeholder,
  ref,
  id,
  font,
  margin,
  value,
}) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className={`block mb-1 ${font} ${margin && margin}`}>
        {id}
      </label>
      <input
        defaultValue={value}
        ref={ref}
        required={required ? required : ""}
        type={type}
        id={id}
        placeholder={`Enter your ${placeholder}`}
        className="input-focus px-4 py-3 w-full rounded-sm duration-300 bg-[#f3f3f5]"
      />
    </div>
  );
}
