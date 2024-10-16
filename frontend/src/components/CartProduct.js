import React from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCartItems,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} className="w-40 h-28 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-600 "
            onClick={() => dispatch(deleteCartItems(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" font-medium  text-slate-500">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-600">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => dispatch(increaseQty(id))}
              className="bg-slate-300 py-1 my-2 rounded hover:bg-slate-400  p-2"
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-2">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className="bg-slate-300 py-1 my-2 rounded hover:bg-slate-400  p-2"
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-red-600">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
