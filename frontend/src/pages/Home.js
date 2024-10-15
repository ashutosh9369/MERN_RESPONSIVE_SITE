import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
import { Link } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "Vegetables",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2 ">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-700 px-2 items-center rounded-full w-36">
            <p className="text-sm font-medium text-white">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery at{" "}
            <span className="text-blue-700">Your Home</span>
          </h2>
          <p className="py-3 text-base max-w-xl text-justify ">
            Welcome to{" "}
            <span className=" text-blue-700 font-bold">Fintoxx Shop</span> –
            Your One-Stop Online Shopping Destination!
          </p>
          <p className="py-1 text-base max-w-xl text-pretty">
            At <span className=" text-blue-700 font-bold">Fintoxx Shop</span>,
            we believe that shopping should be an enjoyable and seamless
            experience. Founded with the vision to bring quality products to
            your doorstep. Our mission is to provide our customers with the best
            value, exceptional customer service, and a convenient shopping
            experience, all from the comfort of your home.
          </p>
          <Link to={"/menu/66c7a372fb997909b375d800"}>
            <button className="font-bold bg-blue-800 text-white px-4 py-2 rounded-full">
              Order Now
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading...."} />
                );
              })}
        </div>
      </div>
      {/* <div className="">
        <div className="flex w-full items-center">
          <h2 className=" font-bold text-2xl text-slate-700 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-5">
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={prevProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "CartLoading"} />
              ))}
        </div>
      </div>
      <AllProduct heading={"Your Product"} /> */}
    </div>
  );
};

export default Home;
