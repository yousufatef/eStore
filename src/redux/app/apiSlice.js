import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_UTL } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_UTL,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["product", "user", "order"],
  endpoints: () => ({}),
});
