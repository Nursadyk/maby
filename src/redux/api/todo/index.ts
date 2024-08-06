import { api as index } from "..";
const url = process.env.NEXT_PUBLIC_URL;
const upload = process.env.NEXT_PUBLIC_URL_UPLOAD;
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<Itodo[], void>({
      query: () => "",
      providesTags: ["Todo"],
    }),
    uploadFile: build.mutation({
      query: (newData) => ({
        url: `${upload}/upload/file`,
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Todo"],
    }),
    postTodo: build.mutation({
      query: (obj) => ({
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: build.mutation({
      query: ({ _id, ...rest }) => ({
        url: `${url}/${_id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (_id) => ({
        url: `${url}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
export const {
  useGetMeQuery,
  useUploadFileMutation,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
