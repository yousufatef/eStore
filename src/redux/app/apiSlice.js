import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, USERS_URL } from "../../constants";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//refresh Token
//args: request url, method, body
//api: request signal, dispatch, gitState()
//extraOptions: custom like {shout: true}
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // Await the refresh token call
    const refreshResult = await baseQuery(
      `${USERS_URL}/refresh`,
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      Cookies.set("accessToken", accessToken);

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message =
          "Your LogIn has expired. Please try again";
      }
      return refreshResult;
    }
  }

  // Return the result (either the original, retried, or error)
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["product", "user", "order"],
  endpoints: () => ({}),
});
