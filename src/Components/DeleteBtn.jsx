import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteBtn({ id, handleClick }) {
  return (
    <button
      type="button"
      className="cursor-pointer text-red-600 p-2 hover:bg-neutral-300 duration-300 rounded-lg"
      onClick={() => handleClick(id)}
    >
      <FontAwesomeIcon icon="fa-regular fa-trash-can" />
    </button>
  );
}
