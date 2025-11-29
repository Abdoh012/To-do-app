import { useState } from "react";
import AuthForm from "./AuthForm/AuthForm";
import AuthButtonsContext from "./Contexts/AuthButtonsContext";
import SideBar from "./SideBar/SideBar";
import Tasks from "./Tasks/Tasks";
import Goals from "./Goals/Goals.jsx";
import Habits from "./Habits/Habits.jsx";
import Profile from "./Profile/Profile";
import NavBtnCtx from "./Contexts/NavBtnCtx";

function App() {
  // States
  const [activeForm, setActiveForm] = useState("login");
  const [activePage, setActivePage] = useState({
    authPage: true,
    tasks: false,
    goals: false,
    habits: false,
    profile: false,
  });
  // End of states

  // Functions

  // Display login or sign up page
  function handleActiveClick(pageName) {
    setActiveForm(pageName.toLowerCase());
  }

  // Display dash board page and hide auth page
  function displayPage(page) {
    setActivePage((prevPages) => {
      return {
        authPage: false,
        tasks: false,
        goals: false,
        habits: false,
        profile: false,
        authPage: false,
        [page]: true,
      };
    });
  }
  // End of functions

  // Context values

  // Auth buttons context value
  const authCtxValue = {
    onActiveFormClick: handleActiveClick,
    activeAuth: activeForm,
    activePage: displayPage,
  };

  // Nav buttons context value
  const navBtnCtxValue = {
    setActivePage: displayPage,
  };
  // End of context values

  // Component structure
  return (
    <>
      {/* Authentication page */}
      <AuthButtonsContext value={authCtxValue}>
        {activePage.authPage && <AuthForm />}
      </AuthButtonsContext>

      <section className="flex">
        {/* Side bar */}
        <NavBtnCtx value={navBtnCtxValue}>
          {!activePage.authPage && (
            <SideBar activePage={activePage} onLogoutClick={displayPage} />
          )}
        </NavBtnCtx>

        {/* Display the correct page based on a state (which nav button was clicked) */}
        {activePage.tasks ? (
          <Tasks />
        ) : activePage.goals ? (
          <Goals></Goals>
        ) : activePage.habits ? (
          <Habits></Habits>
        ) : activePage.profile ? (
          <Profile></Profile>
        ) : null}
      </section>
    </>
  );
}

export default App;
