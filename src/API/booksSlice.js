import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

export const booksApi = createApi({
  reducerPath:'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints:(builder) => ({
    getBooks: builder.query({
      query: () => `books`,
    }),
    getSingleBook: builder.query({
      query: (id) => `books/${ id }`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
} = booksApi;