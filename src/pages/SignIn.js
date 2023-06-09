import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { logodark } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSlice";
function SignIn() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      dispatch(
        setUserInfo({
          _id: user.uid,
          userName: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
    navigate("/");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your Email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {
      setLoader(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );

          setLoader(false);
          setSuccessMsg("Logged in Successfully! Welcome you back");
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch((error) => {
          setLoader(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setErrEmail("Invalid Email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setErrPassword("Wrong password! try again");
          }
        });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10 pt-6">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center gap-4">
            <Link to="/">
              <img className="w-32 object-contain" src={logodark} alt="logo" />
            </Link>
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titelFont text-3xl font-medium mb-4">
                Sing in{" "}
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or Mobile Phone Number
                  </p>
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
                <button
                  onClick={handleLogin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>
                {loader && (
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
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-600">or</p>
                  <button
                    onClick={handleGoogleLogin}
                    className=" flex gap-14 w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput"
                  >
                    <span className="mx-2">
                      <GoogleIcon />
                    </span>{" "}
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-balck leading-4 mt-4">
                By Continuing, you agree to Amazone's{" "}
                <span className="text-blue-600 curs">Conditon of Use</span> and{" "}
                <span className="text-blue-600">Privace of Use</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursro-pointer group">
                <ArrowRightIcon />{" "}
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                  Need help?
                </span>
              </p>
            </div>
            <div className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 bg-zinc-400 h-[1px] "></span>
              <span className="w-1/3 text-center">New to Amazone?</span>
              <span className="w-1/3 bg-zinc-400 h-[1px] "></span>
            </div>
            <Link className="w-full" to="/registration">
              <button className="w-full bg-gradient-to-t from-slate-200 to-slate-100 border border-zinc-400 py-1.5 mt-4 hover:bg-gradient-to-b text-sm font-normal active:border-yellow-800 active:shadow-amazoneInput">
                Create your Amazone Account
              </button>
            </Link>
          </form>
        )}
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

export default SignIn;
