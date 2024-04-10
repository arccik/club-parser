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
      providesTags: (result, error, arg) => {
        if (!result?.events) return [{ type: "Events", id: "LIST" }];
        else {
          return [
            ...result.events.map(({ _id }) => ({ type: "Events", _id: _id })),
          ];
        }
      },
    }),
    getEventsByLocation: builder.query({
      query: (coords) => {
        return `/admin/events?coords=${coords.lng},${coords.lat}`;
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
      query: (page) => `/admin/oldevents?page=${page}`,
      transformFromResponse: (responseData) => {
        return eventAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result?.events) return [{ type: "Events", _id: "LIST" }];
        return [
          { type: "Events", id: "LIST" },
          ...result.events.map(({ _id }) => ({ type: "Events", _id: _id })),
        ];
      },
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
        if (!response.length) {
          return [
            {
              placeType: "event",
              id: "1",
              image: "/assets/logo.png",
              description: "Not Found",
              name: "Nothing was found",
            },
          ];
        } else {
          return response.map((item) => ({
            placeType: item.placeType,
            id: item._id,
            image: item.image,
            label: item.name,
            description: item.description || "PLACE FOR DESCRIPTIONS",
            value: item.name,
          }));
        }
      },
      providesTags: (result, error, arg) => {
        if (error) return [];
        if (result.notFound) return [{ type: "Events", _id: "LIST" }];
        return [...result.map(({ _id }) => ({ type: "Events", _id: _id }))];
      },
    }),
    getSortedEvents: builder.query({
      query: ({ sortValue, activePage, location }) => {
        if (!location)
          return `/sortby/event?sortby=${sortValue}&page=${activePage}`;
        else
          return `/sortby/event?sortby=${sortValue}&page=${activePage}&coords=${location.lng},${location.lat}`;
      },

      providesTags: (result, error, arg) => {
        if (!result?.events) return { type: "Events", _id: "LIST" };
        if (error) return [];
        return [
          ...result.events.map(({ _id }) => ({ type: "Events", _id: _id })),
        ];
      },
    }),
    getGenres: builder.query({
      query: () => "/genres",
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventsByLocationQuery,
  useGetEventByIdQuery,
  useSearchEventsQuery,
  useGetOldEventsQuery,
  useGetSortedEventsQuery,
  useGetGenresQuery,
  useAddNewEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = extendedApiSlice;
