import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (e) => e._id,
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/events",
      transformFromResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          if (!post.date) post.date = new Date();
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Post", _id })),
      ],
    }),
    getPostById: builder.query({
      query: (id) => `/events/${id}`,
      transformFromResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          if (!post.date) post.date = new Date();
          if (!post.reaction) post.reaction = "😃";
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Post", _id: result?._id }];
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Post", _id: arg }];
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/events",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
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
    deletePost: builder.mutation({
      query: ({ _id }) => ({
        url: `/events/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = extendedApiSlice;

export const selectPostsResults = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResults,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
