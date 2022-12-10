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
        { type: "Events", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Events", _id })),
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

      providesTags: (result, error, _id) => {
        return [{ type: "Events", _id }];
      },
      invalidatesTags: (result, error, _id) => {
        return [{ type: "Events", _id }];
      },
    }),
    getFieldsNames: builder.query({
      query: (type) => `/getfields?type=${type}`,
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
      invalidatesTags: (result, error, arg) => [
        { type: "Events", id: arg._id },
      ],
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
  useGetFieldsNamesQuery,
  useAddNewEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = extendedApiSlice;
