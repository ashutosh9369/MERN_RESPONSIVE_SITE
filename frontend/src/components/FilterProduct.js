import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5 bg-yellow-500 text-white rounded-full flex text-center justify-center cursor-pointer ${
          isActive && "bg-yellow-700"
        }`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
