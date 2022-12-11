import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const adminAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date), // sort list
  selectId: (e) => e._id,
});

const initialState = adminAdapter.getInitialState();

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
        return adminAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: (result, error, arg) => [
        { type: "Events", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Events", _id })),
      ],
    }),

    getFieldsNames: builder.query({
      query: (type) => `/admin/getfields?type=${type}`,
      transformFromResponse: (responseData) => {
        return adminAdapter.setAll(initialState, responseData);
      },
    }),
    getDocumentsCount: builder.query({
      query: () => `/evetns?count`,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetFieldsNamesQuery,
  useGetDocumentsCountQuery,
} = extendedApiSlice;
