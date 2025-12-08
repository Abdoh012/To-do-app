import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditBtn({ id, handleClick }) {
  return (
    <button
      className="cursor-pointer p-2 hover:bg-neutral-200 duration-300 rounded-lg"
      onClick={() => handleClick(id)}
    >
      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
    </button>
  );
}
