import React from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from '@mui/icons-material/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";
function Products() {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const productData = data.data;

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 gap-4 px-4">
      {productData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:testShadow duration-200 relative flex flex-col gap-4"
        >
         <span className="text-xs capitalize absolute italic top-2 right-2 text-gray-500 ">{item.category}</span>
          <div className="flex items-center justify-center w-full h-auto relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="productImg"
            />
            <ul className="absolute w-full h-36  bg-gray-100 flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r bottom-[-170px] group-hover:bottom-0 duration-700">
            <li className="productLi">Compair <span><ApiIcon/></span></li>
            <li className="productLi">Add to cart <span><ShoppingCartIcon/></span></li>
            <li className="productLi">View Details <span><ArrowCircleRightIcon/></span></li>
            <li className="productLi">Add to wish list <span><FavoriteIcon/></span></li>
            </ul>
          </div>
          <div className="px-4 z-10 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="tracking-wide font-titleFont text-md font-medium text-amazone_blue">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0, 100)}...</p>
              <div className="text-yellow-500">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button onClick={()=>dispatch(addToCart({
              id:item.id,
              title:item.title,
              description:item.description,
              price:item.price,
              category:item.category,
              image:item.image,
              quantity:1
            }))} className="bg-gradient-to-tr from-yellow-400 to-yellow-200 w-full font-titleFont font-medium text-base py-1.5 rounded-md mt-3 border border-yellow-500 hover:border-yellow-700
            hover:from-yellow-300 hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Products;
