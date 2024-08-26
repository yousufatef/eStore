import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { cartSliceReducer } from "../features/cartSlice";
import { authSliceReducer } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
