import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SideNavContent from "./SideNavContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function HeaderBottom() {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSideBar(false);
      }
    });
  });
  return (
    <div className="w-full px-4 text-white h-[36px] bg-amazone_light flex text-xs items-center">
      <ul className=" flex items-center gap-2 tracking-wide">
        <li
          onClick={() => setSideBar(true)}
          className=" headerHover flex items-center gap-1 font-semibold"
        >
          <MenuIcon />
          All
        </li>
        <li className="headerHover hidden mdl:inline-flex">Today's Deal</li>
        <li className="headerHover hidden mdl:inline-flex">Customer Service</li>
      </ul>
      {sideBar && (
        <div className="h-screen w-full text-black fixed top-0 left-0 bg-amazone_blue bg-opacity-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] mdl:w-[350px] h-full bg-white border border-black"
            >
              <div className="w-full bg-amazone_light text-white py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img
                    className="w-8 object-contain rounded-full border p-1"
                    src={userInfo.image}
                    alt="userProfile"
                  />
                ) : (
                  <AccountCircleIcon />
                )}

                {userInfo ? (
                  <h3 className="font-titlefont font-bold text-lg tracking-wide">
                    {userInfo.userName}
                  </h3>
                ) : (
                  <h3 className="font-titlefont font-bold text-lg tracking-wide">
                    Hello, Sign In
                  </h3>
                )}
              </div>

              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Release"
                three="Mover and Shaker"
              />
              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Release"
                three="Mover and Shaker"
              />
              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Release"
                three="Mover and Shaker"
              />
              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Release"
                three="Mover and Shaker"
              />
              <span
                onClick={() => setSideBar(false)}
                className="absolute cursor-pointer top-0 w-10 h-10 mt-2 mr-2 text-white flex items-center justify-center left-[300px] mdl:left-[350px]"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderBottom;
