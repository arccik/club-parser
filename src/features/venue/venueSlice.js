import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const venueAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date), // sort list
  selectId: (e) => e._id,
});

const initialState = venueAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVenues: builder.query({
      query: () => "/venues",
      transformFromResponse: (responseData) => {
        const loadedVenues = responseData.map((post) => {
          if (!post.date) post.date = new Date();
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return venueAdapter.setAll(initialState, loadedVenues);
      },
      providesTags: (result, error, arg) => [
        { type: "Venues", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Venues", id: _id })),
      ],
    }),
    getVenueById: builder.query({
      query: (_id) => `/venues/${_id}`,
      transformFromResponse: (responseData) => {
        return venueAdapter.setAll(initialState, responseData);
      },

      providesTags: (result, error, _id) => {
        console.log("Provide Tags: ", _id);
        return [{ type: "Venues", _id }];
      },
      invalidatesTags: (result, error, _id) => {
        return [{ type: "Venues", _id }];
      },
    }),
    addNewVenue: builder.mutation({
      query: (initialPost) => ({
        url: "/venues",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Venues", _id: "LIST" }],
    }),
    updateVenue: builder.mutation({
      query: (initialPost) => ({
        url: `/venues/${initialPost._id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Venues", _id }],
    }),
    deleteVenue: builder.mutation({
      query: (_id) => ({
        url: `/venues/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Venues", _id }],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useAddNewVenueMutation,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
} = extendedApiSlice;
