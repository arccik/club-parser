import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const adminAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = adminAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFieldsNames: builder.query({
      query: (type) => `/admin/getfields?type=${type}`,
      transformFromResponse: (responseData) => {
        return adminAdapter.setAll(initialState, responseData);
      },
    }),
    getDocumentsCount: builder.query({
      query: (type) => `/admin/getcounts/${type}`,
    }),
    getVenuesForEvents: builder.query({
      query: () => `/admin/venues/venue-list`,
    }),
    checkUser: builder.query({
      query: (user) => `/admin/checkuser/${user.email}`,
    }),
    getMessages: builder.query({
      query: () => "/admin/contact",
      providesTags: (result, error, arg) => [{ type: "Message", id: "LIST" }],
    }),
    sendMessage: builder.mutation({
      query: (body) => {
        return {
          url: `/admin/contact`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: (result, error, _id) => [{ type: "Message", _id }],
    }),
    readMessage: builder.mutation({
      query: (_id) => {
        return {
          url: `/admin/contact?read=${_id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, _id) => [{ type: "Message", _id }],
    }),
    recommendEvent: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/recommend/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, _id) => [{ type: "Events", _id }],
    }),
  }),
});

export const {
  useGetFieldsNamesQuery,
  useGetDocumentsCountQuery,
  useGetVenuesForEventsQuery,
  useCheckUserQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useReadMessageMutation,
  useRecommendEventMutation,
} = extendedApiSlice;
