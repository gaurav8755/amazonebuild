import React from "react";

function FooterTop() {
  return (
    <div className="bg-white py-6 w-full">
      <div className="w-full border-t-[1px] border-b-[1px] py-8">
        <div className=" w-64 mx-auto text-center ">
          <p className="text-sm">See Personalized recommendations</p>
          <button className="w-full bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 font-semibold py-1 active:bg-yellow-600">
            Sign In
          </button>
          <p className="text-xs mt-1">
            New customber?{" "}
            <span className="text-blue-600 cursor-pointer ml-1">
              start here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
