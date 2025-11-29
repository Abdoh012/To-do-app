import Input from "./Input";
import Background from "./Background";
import Icon from "./Icon";
import Button from "./Button";

import { use, useRef } from "react";
import AuthButtonsContext from "../Contexts/AuthButtonsContext";
import ActionBtn from "../ActionBtn";

// Variables
const EMAIL = "abdohmahmoud28@gmail.com";
const PASSWORD = "123456789";

export default function Login() {
  // Refs
  const emailInput = useRef();
  const passwordInput = useRef();
  // End of refs

  // Context
  const { activeAuth, activePage } = use(AuthButtonsContext);
  // End of context

  // Functions

  // Handle sign in click
  function handleSignInClick() {
    const emailValue = emailInput.current.value;
    let passwordValue = passwordInput.current.value;

    // If email and password are right sign in and display dashboard
    // Put that condition later => emailValue === EMAIL && passwordValue === PASSWORD
    if (emailValue) {
      activePage("tasks");

      // If the password is not correct
    } else if (passwordValue && passwordValue != PASSWORD) {
      passwordInput.current.value = "";
      passwordInput.current.placeholder = "Wrong password";
    }
  }
  // End of functions

  return (
    <>
      <section className="h-screen overflow-hidden flex justify-center items-center flex-col">
        {/* Top section */}
        <div className="top text-center mb-8">
          {/* Icon */}
          <Icon
            width={"w-20"}
            height={"h-20"}
            radius={"rounded-3xl"}
            shadowS={"shadow-2xl"}
            shadow={"shadow-emerald-500/50"}
            svgW={"w-10"}
            svgH={"h-10"}
          />

          {/* Title and description of project */}
          <div className="title mb-3 text-white">TaskFlow</div>
          <div className="description text-[#d0fae5]">
            Manage your tasks, goals, and habits
          </div>
        </div>

        {/* Background image */}
        <Background />

        {/* Sign in section */}
        <div className="w-110 bg-white/95 p-10 rounded-2xl">
          {/* Buttons to navigate between sign in and sign up pages */}
          <div className="flex justify-between gap-2 mb-5">
            <Button>Login</Button>
            <Button>Sign Up</Button>
          </div>

          {/* Inputs */}
          <form action="">
            {/* If login page show this */}
            {activeAuth === "login" ? (
              <>
                {/* Email */}
                <Input
                  type={"email"}
                  id={"Email"}
                  required={true}
                  placeholder={"email"}
                  ref={emailInput}
                  font="font-bold"
                ></Input>

                {/* Password */}
                <Input
                  type={"password"}
                  id={"Password"}
                  placeholder={"password"}
                  required={true}
                  ref={passwordInput}
                  font="font-bold"
                ></Input>
              </>
            ) : (
              // If sign up page show this
              <>
                {/* Full name */}
                <Input
                  type={"text"}
                  id={"Full Name"}
                  placeholder={"name"}
                  required={true}
                  font="font-bold"
                ></Input>

                {/* Email */}
                <Input
                  type={"email"}
                  id={"Email"}
                  required={true}
                  placeholder={"email"}
                  font="font-bold"
                ></Input>

                {/* Password */}
                <Input
                  type={"password"}
                  id={"Password"}
                  placeholder={"password"}
                  required={true}
                  font="font-bold"
                ></Input>
              </>
            )}

            {/* If login page show this */}
            {activeAuth === "login" && (
              <>
                <div className="flex justify-between mb-5">
                  {/* Remember me button */}
                  <div className="">
                    {/* Modern checkbox */}
                    <div className="checkbox-wrapper-19 flex items-center">
                      <input type="checkbox" id="cbtest-19" />
                      <label htmlFor="cbtest-19" className="check-box"></label>
                      <label
                        htmlFor="cbtest-19"
                        className="ms-2 cursor-pointer font-bold"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  {/* Forgot password button */}
                  <button className="capitalize text-emerald-600 cursor-pointer hover:text-emerald-800 duration-300">
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {/* Sign in button */}
            <ActionBtn
              handleClick={
                activeAuth === "login" ? handleSignInClick : undefined
              }
              type="confirm"
            >
              {/* If login page The button text is Sign In else Create Account */}
              {activeAuth === "login" ? "Sign In" : "Create Account"}
            </ActionBtn>
          </form>
        </div>
      </section>
    </>
  );
}
