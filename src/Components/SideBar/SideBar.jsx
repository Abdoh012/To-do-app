import Icon from "../AuthForm/Icon";
import NavButton, { MotionNavButton } from "./NavButton";
import { navBtns } from "@/util/data";
import { motion } from "motion/react";

// Import font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../util/fontAwesome.js";

// Variables
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
              <MotionNavButton
                key={btn.id}
                // Button text
                text={btn.btnText}
                // fa-icon of the button
                fa={btn.faIcon}
                // Colors of the buttons
                textColor={activePage[btn.activePage] ? "#fff" : "#444"}
                // Colors of the icons
                iconColors={
                  activePage[btn.activePage]
                    ? activeIconStyle
                    : nonActiveIconStyle
                }
                // Active page
                activePage={btn.activePage}
              >
                {activePage[btn.activePage] && (
                  <motion.div
                    layoutId="moving-bg"
                    className="absolute inset-0 rounded-lg bg-emerald-500"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </MotionNavButton>
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
