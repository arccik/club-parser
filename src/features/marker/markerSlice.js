import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const markerAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date), // sort list
  selectId: (e) => e._id,
});

const initialState = markerAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarkers: builder.query({
      query: (type) => `/markers/${type}`,
      transformFromResponse: (responseData) => {
        return markerAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (error) return [{ type: "Markers", id: "LIST" }];
        else return [...result.map(({ _id }) => ({ type: "Markers", _id }))];
      },
    }),
    getEventMarkers: builder.query({
      query: () => "/markers/events",
      transformFromResponse: (responseData) => {
        const loadedEvents = responseData.map((post) => {
          if (!post.position) {
            post.position = {
              lat: post.location.coordinates[0],
              lng: post.location.coordinates[1],
            };
          }
          return post;
        });
        return markerAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: (result, error, arg) => [
        ...result.map(({ _id }) => ({ type: "Markers", _id })),
      ],
    }),
    getVenueMarkers: builder.query({
      query: () => "/markers/venues",
      transformFromResponse: (responseData) => {
        const loadedVenues = responseData.map((post) => {
          if (!post.position) {
            post.position = {
              lat: post.location.coordinates[0],
              lng: post.location.coordinates[1],
            };
          }
          return post;
        });
        return markerAdapter.setAll(initialState, loadedVenues);
      },
      providesTags: (result, error, arg) => [
        { type: "Markers", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Markers", _id })),
      ],
    }),
  }),
});

export const {
  useGetMarkersQuery,
  useGetVenueMarkersQuery,
  useGetEventMarkersQuery,
} = extendedApiSlice;
