import React from "react";
import { FooterBottomItem } from "../../constants";
function FooterBottom() {
  return (
    <div className="w-full bg-footerBottom py-8">
      <div className="max-w-4xl mx-auto px-4">
       <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-3 place-items-center text-gray-400">
          {
            FooterBottomItem.map((item)=>(
                   <div className = "group cursor-pointer" key = {item.id}>
                    <h3 className="w-24 text-[12px] group-hover:underline text-[#DDD] leading-3 mb-[2px]">{item.title}</h3>
                    <p className="w-24 tracking-wide text-[12px] text-[#999] group-hover:underline leading-3">{item.des}</p>
                   </div>    
            ))
          }
       </div>
      </div>
    </div>
  );
}

export default FooterBottom;
