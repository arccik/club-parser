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
          if (!post.date) post.date = new Date();
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return eventAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Post", _id })),
      ],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      transformFromResponse: (responseData) => {
        const loadedEvent = responseData.map((post) => {
          if (!post.date) post.date = new Date();
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return eventAdapter.setAll(initialState, loadedEvent);
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Post", _id: result?._id }];
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Post", _id: arg }];
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
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
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
    deleteEvent: builder.mutation({
      query: ({ _id }) => ({
        url: `/events/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
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
