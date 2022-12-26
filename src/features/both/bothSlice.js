import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const bothAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.open.localeCompare(a.open), // sort list
  selectId: (e) => e._id,
});

const initialState = bothAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearByPlaces: builder.query({
      query: (coords) => {
        return `/similar?coords=${coords.lat},${coords.lng}`;
      },
      transformFromResponse: (responseData) => {
        return bothAdapter.setAll(initialState, responseData);
      },
      providesTags: ({ reuslt }, error, arg) => {
        if (!reuslt) return [{ type: "Events", id: "LIST" }];
        else {
          return [...reuslt.map(({ _id }) => ({ type, _id: _id }))];
        }
      },
    }),
    getUpcomingEventsForVenue: builder.query({
      query: (venueId) => {
        return `/similar?venueid=${venueId}`;
      },
      transformFromResponse: (responseData) => {
        return bothAdapter.setAll(initialState, responseData);
      },
      providesTags: ({ reuslt }, error, arg) => {
        if (!reuslt) return [{ type: "Events", id: "LIST" }];
        else {
          return [...reuslt.map(({ _id }) => ({ type, _id: _id }))];
        }
      },
    }),
  }),
});

export const { useGetNearByPlacesQuery, useGetUpcomingEventsForVenueQuery } =
  extendedApiSlice;
