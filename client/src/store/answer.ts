import { apiSlice } from "@/config";

const answerApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addAnswer: builder.mutation<any, any>({
        query: (data) => ({
          url: "/answer",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["question"],
      }),
      updateAnswer: builder.mutation({
        query: ({ id, ...rest }) => ({
          url: `/answer/${id}`,
          method: "PATCH",
          body: { ...rest },
        }),
        invalidatesTags: ["question"],
      }),
      deleteAnswer: builder.mutation({
        query: (id) => ({
          url: `/answer/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["question"],
      }),
    };
  },
});

export const {
  useAddAnswerMutation,
  useUpdateAnswerMutation,
  useDeleteAnswerMutation,
} = answerApi;
