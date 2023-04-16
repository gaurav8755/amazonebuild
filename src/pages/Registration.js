import React, { useState } from "react";
import { logodark } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
function Registration() {
  const auth = getAuth();
  const navigate = useNavigate();
  // Input State function start
  const [errFirebase, setErrFirebase] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error massages start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  // loading startes hear
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  // handle function start
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email Validation start
  const emailValidation = (email) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };
  // Submit Button Start
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your Email or Password");
      setErrFirebase("");
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      setErrFirebase("");
    }
    if (!password) {
      setErrPassword("Enter you Password");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 character");
    }
    if (!cPassword) {
      setErrCPassword("Conform your password");
    } else if (cPassword !== password) {
      setErrCPassword("Password not matched");
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      // firebase  registration started hear
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: "https://bootdey.com/img/Content/avatar/avatar7.png",
          });
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          setSuccessMsg("Account Created Successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrFirebase("Email already in use, Try another one");
          }
        });
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
    }
  };
  return (
    <div className="w-full pt-5">
      <div className="bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center gap-4">
          <Link to="/">
            <img className="w-32 object-contain" src={logodark} alt="logo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titelFont text-3xl font-medium mb-4">
              Sign up{" "}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border border-zinc-400 px-2 taxt-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazoneInput duration-100"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone Number</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 taxt-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazoneInput duration-100"
                  type="email"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {errFirebase && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errFirebase}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full py-1 border border-zinc-400 px-2 taxt-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazoneInput duration-100"
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  className="w-full py-1 border border-zinc-400 px-2 taxt-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazoneInput duration-100"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be atleast 6 character
                </p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#febd69"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              )}
              {
                successMsg && (
                  <div>
                  <motion.p initial = {{y:10, opacity:0}} animate = {{y:0, opacity:1}} transition={{duration:0.5}} className="text-base font-titleFont text-green-500 border-[1px] border-green-500 px-2 text-center">{successMsg}</motion.p>
                  </div>
              )
              }
            </div>
            <p className="text-xs text-balck leading-4 mt-4">
              By Continuing, you agree to Amazone's{" "}
              <span className="text-blue-600 curs">Conditon of Use</span> and{" "}
              <span className="text-blue-600">Privace of Use</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account
                <Link to="/signin">
                  <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline underline-offset-1 text-xs">
                    {" "}
                    Sign in{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-1.5">
                Buying for work ?{" "}
                <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline underline-offset-1 text-xs">
                  Creat a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col items-center justify-center gap-4 py-10">
        <div className="flex items-center gap-6">
          <p className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline underline-offset-1 text-xs">
            Conditon of Use
          </p>
          <p className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline underline-offset-1 text-xs">
            Privacy Notic
          </p>
          <p className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline underline-offset-1 text-xs">
            Terms
          </p>
        </div>
        <p className="text-xs text-gray-600 tracking-wide">
          © 1996-2023, GauravGB.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default Registration;
