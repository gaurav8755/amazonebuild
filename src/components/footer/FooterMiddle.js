import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import { middleList } from "../../constants";
import { india_flg, logo } from "../../assets/index";
function FooterMiddle() {
  return (
    <div className="w-full bg-amazone_light text-white">
      {/*top*/}
      <div className="p-10 w-full border-gray-500 border-b-[1px]">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 gap-6 md:place-items-center ">
            {middleList.map((item) => (
              <FooterMiddleList
                key={item._id}
                title={item.title}
                listItems={item.listItmes.listData}
              />
            ))}
          </div>
        </div>
      </div>
      {/*bottom*/}
      <div className="flex gap-6 items-center justify-center py-6">
        <div>
          <img className="w-20 pt-3" src={logo} alt="logo" />
        </div>
        <div>
          <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazone_yellow cursor-pointer duration-200 px-2 py-1">
            English
          </p>
        </div>
        <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazone_yellow cursor-pointer duration-200 px-2 py-1">
          <img className="w-6" src={india_flg} alt="flg" />
          <p>India</p>
        </div>
      </div>
    </div>
  );
}

export default FooterMiddle;
