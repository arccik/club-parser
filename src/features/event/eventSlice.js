import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const eventAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date), // sort list
  selectId: (e) => e._id,
});

const initialState = eventAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
      transformFromResponse: (responseData) => {
        const loadedEvents = responseData.map((post) => {
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return eventAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: (result, error, arg) => [
        { type: "Venues", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Venues", _id: _id })),
      ],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      transformFromResponse: (responseData) => {
        const loadedEvent = responseData.map((post) => {
          if (!post?.reaction) post.reaction = "😃";
          return post;
        });
        return eventAdapter.setAll(initialState, loadedEvent);
      },

      providesTags: (result, error, _id) => {
        return [{ type: "Events", _id }];
      },
      invalidatesTags: (result, error, _id) => {
        return [{ type: "Events", _id }];
      },
    }),
    addNewEvent: builder.mutation({
      query: (initialPost) => ({
        url: "/events",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Events", _id: "LIST" }],
    }),
    updateEvent: builder.mutation({
      query: (initialPost) => ({
        url: `/events/${initialPost._id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      providesTags: (result, error, _id) => {
        return [{ type: "Events", _id }];
      },
      invalidatesTags: (result, error, { _id }) => {
        return [{ type: "Events", _id }];
      },
    }),
    deleteEvent: builder.mutation({
      query: (_id) => ({
        url: `/events/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Events", _id }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useAddNewEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = extendedApiSlice;
