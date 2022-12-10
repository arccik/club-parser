import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL = process.env.NEXT_PUBLIC_API;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "Venues",
    "EventMarkers",
    "Markers",
    "VenueMarkers",
    "Post",
    "Events",
  ],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({}),
});
