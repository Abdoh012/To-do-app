import Icon from "../AuthForm/Icon";
import NavButton from "./NavButton";
import { navBtns } from "@/util/data";

// Import font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../util/fontAwesome.js";

// Variables
const activeBtnStyle = "bg-emerald-500 text-white";
const nonActiveBtnStyle = "bg-auto text-neutral-700";
const activeIconStyle = "text-white";
const nonActiveIconStyle = "text-neutral-700";
// End of variables

export default function SideBar({ activePage, onLogoutClick }) {
  return (
    <div className="w-64 border-r border-neutral-200 h-screen grid grid-rows-[2fr_10fr_1.5fr] fixed top-0 left-0">
      <div className="p-5 flex items-center border-b border-neutral-200">
        <Icon
          width={"w-10"}
          height={"h-10"}
          radius={"rounded-xl"}
          shadow={"shadow-emerald-500/30"}
          shadowS={"shadow-lg"}
          svgW={"w-6"}
          svgH={"h-6"}
        />
        <span className="text-xl font-medium ms-2">TaskFlow</span>
      </div>

      {/* Nav buttons */}
      <nav className="mt-10 mx-5">
        <ul>
          {/* Tasks button */}
          {navBtns.map((btn) => {
            return (
              <NavButton
                key={btn.id}
                // fa-icon of the button
                fa={`${
                  btn.activePage !== "profile" ? "fa-solid" : "fa-regular"
                } ${btn.faIcon}`}
                // Colors of the buttons
                btnColors={
                  activePage[btn.activePage]
                    ? activeBtnStyle
                    : nonActiveBtnStyle
                }
                // Colors of the icons
                iconColors={
                  activePage[btn.activePage]
                    ? activeIconStyle
                    : nonActiveIconStyle
                }
                // Active page
                activePage={btn.activePage}
              >
                {btn.btnText}
              </NavButton>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-200 flex justify-center items-center">
        <button
          className="w-[80%] bg-neutral-50 p-3 text-center border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-100 duration-300"
          onClick={() => onLogoutClick("authPage")}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right-from-bracket"
            className="me-2"
          />
          Logout
        </button>
      </div>
    </div>
  );
}
