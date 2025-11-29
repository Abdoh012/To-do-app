import "../../util/fontAwesome.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBtnCtx from "../Contexts/NavBtnCtx";
import { useContext } from "react";


export default function NavButton({ fa, children, btnColors, iconColors, activePage }) {
  
  const { setActivePage } = useContext(NavBtnCtx);
  return (
    <li className="mb-3 ">
      <button
        className={`w-full cursor-pointer ${btnColors} rounded-2xl mb-5 p-4 flex items-center duration-300 ${!activePage && "hover:bg-neutral-100"}`}
        onClick={() => setActivePage(activePage)}
      >
        <FontAwesomeIcon icon={fa} className={`${iconColors} text-xl me-2`} />
        {children}
      </button>
    </li>
  );
}
