import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_APP_API;

const baseQuery = fetchBaseQuery({
  baseUrl,
});

// create api
export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["answer", "question"],
  endpoints: (_builder) => ({}),
});
