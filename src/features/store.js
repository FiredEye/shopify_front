import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { productApi } from "./productApi";
import { orderApi } from "./orderApi";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
    ]),
});
