import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const artistAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.open.localeCompare(a.open), // sort list
  selectId: (e) => e._id,
});

const initialState = artistAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => "artists",
      transformFromResponse: (responseData) => {
        return artistAdapter.setAll(initialState, responseData);
      },
      providesTags: ({ reuslt }, error, arg) => {
        if (!reuslt) return [{ type: "Artists", id: "LIST" }];
        else {
          return [...reuslt.map(({ _id }) => ({ type, _id: _id }))];
        }
      },
    }),
  }),
});

export const { useGetArtistsQuery } = extendedApiSlice;
