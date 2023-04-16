import React, { useState, useEffect, useRef } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout';
import { logo } from "../../assets/index";
import { AllItems } from "../../constants";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { singnoutUser } from "../../redux/amazonSlice";
function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setShowAll(!showAll);
      }
    });
  });
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  // logout handle
  const handleLogout = ()=>{
    signOut(auth).then(() => {
      console.log("signout succefully");
       dispatch(singnoutUser());
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazone_blue text-white px-4 py-2 items-center flex gap-4">
        {/*Image*/}
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2 " src={logo} alt="logo" />
          </div>
        </Link>

        {/*Location*/}
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnOutlinedIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to
            <span className="text-sm font-semibold text-whiteText -mt-1">
              rudraprayag
            </span>
          </p>
        </div>
        {/*Search*/}
        <div className="hidden mdl:flex h-10 rounded-md flex flex-grow relative">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 boreder-2 cursor-pointer duration-300 text-sm text-amazone_blue font-titleFont flex items-center rounded-tl-md rounded-bl-md justify-center"
          >
            All
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </span>
          {showAll && (
            <div>
              <ul
                ref={ref}
                className="absolute w-56 h-80 top-10 left-0 bg-white border-[1px] border-amazone_blue text-black p-2 flex flex-col gap-1 z-50 overflow-y-scroll overflow-x-hidden"
              >
                {AllItems.map((item) => (
                  <li
                    className="text-sm font-titleFont cursor-pointer duration-300 tracking-wide border-b-[1px] border-b-transparent hover:border-b-amazone_blue"
                    key={item._id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className="h-full text-base text-amazone_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazone_yellow hover:bg-yellow-500 duration-300 text-amazone_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/*signin*/}
        <Link to="/signin">
          <div className="headerHover flex flex-col items-start justify-center">
            {userInfo ? (
              <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                {userInfo.userName}
              </p>
            ) : (
              <p className="text-xs mdl:text-xs text-white mdl:text-lightText font-light">
                Hello, sign in
              </p>
            )}
            <p className=" hidden mdl:inline-flex text-sm font-semibold -mt-1 text-whiteText">
              Account & List{" "}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
        </Link>
        {/*order*/}
        <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
        </div>
        {/*cart*/}
        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              Cart
              <span className="absolute text-xs px-1 top-0 left-6 -mt-1 font-semibold text-amazone_blue bg-amazone_yellow rounded-full">
                {products.length}
              </span>
            </p>
          </div>
        </Link>
        {
          userInfo &&(
            <div onClick={handleLogout} className=" flex flex-col justify-center items-center headerHover">
            <LogoutIcon/>
            <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">Logout</p>
            </div>
          )
        }
      </div>
      <div>
        <HeaderBottom />
      </div>
    </div>
  );
}

export default Header;
