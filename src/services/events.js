import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.NEXT_PUBLIC_API;

// Define a service using a base URL and expected endpoints
export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getEventById: builder.query({
      query: (name) => `events/${name}`,
    }),
    getAllEvents: builder.query({
      query: () => `events`,
    }),
    getMarkers: builder.query({
      query: () => "markers/",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEventByIdQuery,
  useGetAllEventsQuery,
  useGetMarkersQuery,
} = eventsApi;
