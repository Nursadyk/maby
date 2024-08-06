import {
  createApi,
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL });
const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = baseQuery(args, api, extraOptions);
  return result;
};
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Todo"],
  endpoints: () => ({}),
});
