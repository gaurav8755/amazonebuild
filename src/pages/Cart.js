import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import {
  decrmentQuentity,
  deleteItem,
  incrmentQuentity,
  resetCart,
} from "../redux/amazonSlice";
import { emptyCart } from "../assets/index";
import { Link } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2));
    });
  }, [products]);
  return products.length > 0 ? (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto grid grid-cols-5 gap-8 ">
        <div className="w-full h-full bg-white col-span-4 px-4">
          <div className="font-titleFont flex items-center justify-between py-3 border-b-[1px] border-b-gray-400">
            <h2 className="font-medium text-3xl">Shopping Cart</h2>
            <h4 className="text-xl font-normal">Subtotal</h4>
          </div>
          {/* products start hear */}
          <div>
            {products.map((item) => (
              <div
                key={item.id}
                className="w-full flex items-center border-b-[1px] border-b-gray-300 p-4 gap-6"
              >
                <div className="w-full flex items-center justify-between gap-6">
                  <div className="w-1/5">
                    <img
                      className="w-full h-44 object-contain"
                      src={item.image}
                      alt="ProductImg"
                    />
                  </div>
                  <div className="w-4/5">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm">
                      {item.description.substring(0, 200)}...
                    </p>
                    <p text-base>
                      Unit price:{" "}
                      <span className="font-semibold">${item.price}</span>
                    </p>
                    <div className="flex justify-center item-center py-1 rounded-md drop-shadow-lg bg-[#F0F2F2] gap-1 w-24">
                      <p>Qty:</p>
                      <p
                        onClick={() => dispatch(decrmentQuentity(item.id))}
                        className="cursor-pointer bg-gray-200 rounded-md px-1 hover:bg-gray-400 duration-300"
                      >
                        -
                      </p>
                      <p>{item.quantity}</p>
                      <p
                        onClick={() => dispatch(incrmentQuentity(item.id))}
                        className="cursor-pointer bg-gray-200 rounded-md px-1 hover:bg-gray-400 duration-300"
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="cursor-pointer bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                    >
                      Delete Item
                    </button>
                  </div>
                  <div className="">
                    <p className="text-lg font-titleFont font-semibold">
                      ${(item.price * item.quantity).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => dispatch(resetCart())}
              className="cursor-pointer bg-red-500 w-36 py-2 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 my-3 font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className="w-full h-52 bg-white flex flex-col items-center p-4">
          <div>
            <p className="flex gap-2 items-start text-xs">
              <span className="bg-white text-green-500">
                <CheckCircleIcon />
              </span>
              Your Orders qualifies for FREE Shipping Choose the option at
              checkout. See details....
            </p>
          </div>
          <div>
            <p className="font-semibold px-10 py-1 flex items-center gap-2 justify-between">
              Total: <span className="text-lg font-bold">${totalPrice}</span>
            </p>
          </div>

          <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover-border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration:200 py-1.5 rounded-md mt-3">
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  ) : (
    <motion.div
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duriation: 0.6}}
      className=" p-14 flex items-center justify-center gap-6"
    >
      <div>
        <img src={emptyCart} alt="" />
      </div>
      <div className="bg-white w-[400px] p-4 rounded shadow-lg text-center">
        <h1 className="font-titleFont text-lg font-semibold">
          Your Cart Feels Lonely.
        </h1>
        <p className="text-sm">
          Your Shopping cart lives to serve. Give it purpose - fill it with
          books, electronics, videos, etc. and make it happy.
        </p>
        <div>
          <Link to = "/">
            <button className="w-[230px] bg-yellow-400 hover:bg-yellow-600 py-2 rounded-md my-2 font-semibold font-titleFont text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;
