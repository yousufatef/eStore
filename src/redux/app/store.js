import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { cartSliceReducer } from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
