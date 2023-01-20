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
      query: (page) => {
        if (page) return `/admin/venues?page=${page}`;
        return "/admin/venues";
      },
      transformFromResponse: (responseData) => {
        const loadedVenues = responseData.map((post) => {
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return venueAdapter.setAll(initialState, loadedVenues);
      },
      providesTags: ({ venues }, error, arg) => {
        if (!venues) return [{ type: "Venues", id: "LIST" }];
        else {
          return [...venues.map(({ _id }) => ({ type: "Venues", _id: _id }))];
        }
      },
    }),
    getVenueById: builder.query({
      query: (_id) => `/admin/venues/${_id}`,

      providesTags: (result, error, _id) => {
        return [{ type: "Venues", _id }];
      },
      invalidatesTags: (result, error, _id) => {
        return [{ type: "Venues", _id }];
      },
    }),
    getVenueByLocation: builder.query({
      query: (coords) => {
        return `/admin/venues?coords=${coords.lat},${coords.lng}`;
      },
      transformFromResponse: (responseData) => {
        if (responseData) {
          return venueAdapter.setAll(initialState, responseData);
        }
      },
      providesTags: (result, error, arg) => {
        if (error) [{ type: "Venues", id: "LIST" }];
        return [
          { type: "Venues", id: "LIST" },
          ...result.map(({ _id }) => ({ type: "Venues", _id: _id })),
        ];
      },
    }),

    getSortedVenues: builder.query({
      query: ({ sortValue, activePage, location }) => {
        if (!location)
          return `/sortby/venue?sortby=${sortValue}&page=${activePage}`;
        else
          return `/sortby/venue?sortby=${sortValue}&page=${activePage}&coords=${location.lng},${location.lat}`;
      },
      providesTags: (result, error, arg) => {
        if (error || !result) return [];
        return [
          ...result.venues.map(({ _id }) => ({ type: "Venues", _id: _id })),
        ];
      },
    }),
    addNewVenue: builder.mutation({
      query: (initialPost) => ({
        url: "/admin/venues",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Venues", _id: "LIST" }],
    }),
    updateVenue: builder.mutation({
      query: (initialPost) => {
        return {
          url: `/admin/venues/${initialPost._id}`,
          method: "PUT",
          body: {
            ...initialPost,
          },
        };
      },
      providesTags: (result, error, arg) => {
        return [
          { type: "Venues", id: "LIST" },
          ...result.map(({ _id }) => ({ type: "Venues", id: _id })),
        ];
      },
      invalidatesTags: (result, error, { _id }) => {
        return [{ type: "Venues", _id }];
      },
    }),
    deleteVenue: builder.mutation({
      query: (_id) => ({
        url: `/admin/venues/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: "Venues", _id }],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useGetSortedVenuesQuery,
  useGetVenueByLocationQuery,
  useAddNewVenueMutation,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
} = extendedApiSlice;
