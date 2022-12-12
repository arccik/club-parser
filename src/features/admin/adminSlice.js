import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const adminAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = adminAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminEvents: builder.query({
      query: () => "/admin/events",
      transformFromResponse: (responseData) => {
        return adminAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [{ type: "Events", id: "LIST" }],
    }),
    getAdminVenues: builder.query({
      query: () => "/admin/venues",
      transformFromResponse: (responseData) => {
        return adminAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [{ type: "Venues", id: "LIST" }],
    }),

    getFieldsNames: builder.query({
      query: (type) => `/admin/getfields?type=${type}`,
      transformFromResponse: (responseData) => {
        return adminAdapter.setAll(initialState, responseData);
      },
    }),
    getDocumentsCount: builder.query({
      query: () => `/evetns?count`,
    }),
  }),
});

export const {
  useGetAdminEventsQuery,
  useGetAdminVenuesQuery,
  useGetFieldsNamesQuery,
  useGetDocumentsCountQuery,
} = extendedApiSlice;
