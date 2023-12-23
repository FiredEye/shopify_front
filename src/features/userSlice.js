import { createSlice } from "@reduxjs/toolkit";
import {
  clearAllData,
  getUser,
  setUser,
  getCart,
  setCart,
  cartClear,
} from "./storage";

const userSlice = createSlice({
  name: "useSlice",
  initialState: {
    user: getUser(),
    carts: getCart(),
  },
  reducers: {
    setUserToLocal: (state, action) => {
      state.user = action.payload;
      setUser(action.payload);
    },
    addOrUpdateCart: (state, action) => {
      const isExist = state.carts.find(
        (cart) => cart.product === action.payload.product
      );

      if (isExist) {
        state.carts = state.carts.map((cart) =>
          cart.product === isExist.product ? action.payload : cart
        );
        setCart(state.carts);
      } else {
        state.carts.push(action.payload);
        setCart(state.carts);
      }
    },

    removeCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCart(state.carts);
    },
    clearAll: (state, action) => {
      (state.user = null), (state.carts = []), clearAllData();
    },
    clearCartItem: (state, action) => {
      state.carts = [];
      cartClear();
    },
    userUpdate: (state, action) => {
      state.user.shippingAddress =
        action.payload.shippingAddress || state.user.shippingAddress;
      state.user.fullname = action.payload.fullname || state.user.fullname;
      state.user.profile_image =
        action.payload.profile_image || state.user.profile_image;
      setUser(state.user);
    },
    adminUpdate: (state, action) => {
      state.user.fullname = action.payload.fullname || state.user.fullname;
      state.user.email = action.payload.email || state.user.email;
      state.user.profile_image =
        action.payload.profile_image || state.user.profile_image;
      setUser(state.user);
    },
  },
});

export const {
  setUserToLocal,
  addOrUpdateCart,
  removeCart,
  clearCartItem,
  clearAll,
  userUpdate,
  adminUpdate,
} = userSlice.actions;
export default userSlice.reducer;
