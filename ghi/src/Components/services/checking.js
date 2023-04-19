import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const checkingAccountApi = createApi({
  reducerPath: 'CheckingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}`,
    credentials: "include"
  }),
  tagTypes: ['Checking'],
  endpoints: (builder) => ({
    deleteCheckingAccount: builder.mutation({
      query: (id) => ({
        url: `/api/checking_account/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'checking_account', id}]
    }),
    createCheckingAccount: builder.mutation({
      query: (body) => ({
        url: '/api/checking_account',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'checking_account', id: 'LIST' }]
    }),
    getCheckingAccount: builder.query({
      query: () => '/api/checking_account',
      transformResponse: (response) => response.checking_account,
      providesTags: (result) => {
        const tags = [{ type: 'checking_account', id: 'LIST' }]
        if (!result) return tags;
        return [
          ...result.map(({id}) => ({type: 'checking_account', id})),
          ...tags
        ]
      }
    })
  }),
})

export const {
  useCreateCheckingAccountMutation,
  useDeleteCheckingAccountMutation,
  useGetCheckingAccountQuery
} = checkingAccountApi;
