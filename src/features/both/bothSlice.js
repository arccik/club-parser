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
      providesTags: (result, error, arg) => {
        if (!result) return [{ type: "Events", id: "LIST" }];
        else {
          return [...result.map(({ _id }) => ({ type: "Events", _id: _id }))];
        }
      },
    }),
    getByGenres: builder.query({
      query: ({ genre, page }) => `/genres/${genre}?page=${page}`,
      providesTags: ({ result }, error, arg) => {
        if (!result) return [{ type: "Events", id: "LIST" }];
        else {
          return [
            ...result.map(({ _id }) => ({
              type: result.data.placeType === "event" ? "Events" : "Venues",
              _id: _id,
            })),
          ];
        }
      },
    }),
    getByDate: builder.query({
      query: ({ date, page }) =>
        `/sortby/event?sortby=date&date=${date}&page=${page}`,
    }),
    getFromDate: builder.query({
      query: ({ date, page }) =>
        `/sortby/event?sortBy=date&fromDate=true&date=${date}&page=${page}`,
    }),
    rate: builder.mutation({
      query: ({ _id, score, type }) => {
        return {
          url: `/rate?type=${type}&id=${_id}&score=${score}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, _id) => [
        { type: type === "event" ? "Events" : "Venues", _id },
      ],
    }),
  }),
});

export const {
  useGetNearByPlacesQuery,
  useGetUpcomingEventsForVenueQuery,
  useGetByGenresQuery,
  useGetByDateQuery,
  useGetFromDateQuery,
  useRateMutation,
} = extendedApiSlice;
