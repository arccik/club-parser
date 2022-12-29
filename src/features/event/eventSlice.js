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
      query: (page) => {
        if (page) return `/admin/events?page=${page}`;
        return "/admin/events";
      },
      transformFromResponse: (responseData) => {
        const loadedEvents = responseData.map((post) => {
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return eventAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: ({ events }, error, arg) => {
        if (!events) return [{ type: "Events", id: "LIST" }];
        else {
          return [...events.map(({ _id }) => ({ type: "Events", _id: _id }))];
        }
      },
    }),
    getEventsByLocation: builder.query({
      query: (coords) => {
        return `/admin/events?coords=${coords.lat},${coords.lng}`;
      },
      transformFromResponse: (responseData) => {
        // const loadedEvents = responseData.map((post) => {
        //   return post;
        // });
        if (responseData) {
          return eventAdapter.setAll(initialState, responseData);
        }
      },
      providesTags: (result, error, arg) => {
        if (error) return [{ type: "Events", id: "LIST" }];
        return [
          { type: "Events", id: "LIST" },
          ...result.map(({ _id }) => ({ type: "Events", _id: _id })),
        ];
      },
    }),
    getOldEvents: builder.query({
      query: () => "/admin/oldevents",
      transformFromResponse: (responseData) => {
        return eventAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Events", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Events", _id: _id })),
      ],
    }),
    getEventById: builder.query({
      query: (id) => `/admin/events/${id}`,
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
        url: "/admin/events",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Events", _id: "LIST" }],
    }),
    updateEvent: builder.mutation({
      query: (initialPost) => ({
        url: `/admin/events/${initialPost._id}`,
        method: "PUT",
        body: {
          ...initialPost,
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
        url: `/admin/events/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Events", _id }],
    }),
    searchEvents: builder.query({
      query: (searchTerm) => {
        return `/search/${searchTerm}`;
      },
      transformResponse: (response) => {
        if (response[0].notFound) return response[0];
        return response.map((item) => ({
          placeType: item.placeType,
          id: item._id,
          image: item.image,
          label: item.name,
          description: item.description || "PLACE FOR DESCRIPTIONS",
          value: item.name,
        }));
      },
      providesTags: (result, error, arg) => {
        if (error) return [];

        return [...result.map(({ _id }) => ({ type: "Events", _id: _id }))];
      },
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventsByLocationQuery,
  useGetEventByIdQuery,
  useSearchEventsQuery,
  useGetOldEventsQuery,
  useAddNewEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = extendedApiSlice;
