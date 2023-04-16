import React from 'react'

function FooterMiddleList({title,listItems}) {
   
  return (
        <div className='w-full'>
            <h3 className="font-titleFont text-white text-base font-semibold mb-3">{title}</h3>
            <ul className="flex flex-col gap-2 font-bodyFont">
              {listItems.map((data,i)=>(<li key = {i} className='footerLink'>{data}</li>))}
            </ul>
          </div>
  );
}

export default FooterMiddleList