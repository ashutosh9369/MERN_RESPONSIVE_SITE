import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItems = useSelector((state) => state.product.cartItems);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const totalPrice = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productCartItems),
        }
      );
      if (res.statusCode === 500) return;
      const data = await res.json();
      console.log(data);

      toast("Redirect to Payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast.error("Please login to checkout");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItems[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItems.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    price={el.price}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>

            {/* total cart items */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="text-white bg-blue-500 p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-36 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-36 font-bold">
                  {" "}
                  <span className="text-red-600">₹</span>
                  {totalPrice}
                </p>
              </div>
              <button
                className="bg-blue-500 w-full text-lg font-bold py-2 text-white"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm"></img>
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
