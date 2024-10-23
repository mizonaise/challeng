import { apiSlice } from "@/config";

const questionApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addQuestion: builder.mutation<any, any>({
        query: (data) => ({
          url: "/question",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["question"],
      }),
      getQuestions: builder.query<any, any>({
        query: () => ({
          url: `/question`,
        }),
        providesTags: ["question"],
      }),
      updateQuestion: builder.mutation({
        query: ({ id, ...rest }) => ({
          url: `/question/${id}`,
          method: "PATCH",
          body: { ...rest },
        }),
        invalidatesTags: ["question"],
      }),
      deleteQuestion: builder.mutation({
        query: (id) => ({
          url: `/question/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["question"],
      }),
    };
  },
});

export const {
  useAddQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
