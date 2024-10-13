import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItems: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItems: (state, action) => {
      const check = state.cartItems.some((el) => el._id === action.payload._id);

      if (check) {
        toast.error("Item already in cart");
      } else {
        toast("Item Added to Cart");
        const total = action.payload.price;
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItems: (state, action) => {
      toast("One Item Deleted");
      const index = state.cartItems.findIndex(
        (el) => el._id === action.payload
      );
      state.cartItems.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.cartItems[index].qty;
      const qtyInc = ++qty;
      state.cartItems[index].qty = qtyInc;

      const price = state.cartItems[index].price;
      const total = price * qtyInc;
      state.cartItems[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.cartItems[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;

        state.cartItems[index].qty = qtyDec;

        const price = state.cartItems[index].price;
        const total = price * qtyDec;
        state.cartItems[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItems,
  deleteCartItems,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
