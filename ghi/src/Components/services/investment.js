import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const investmentAccountApi = createApi({
  reducerPath: 'InvestmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}`,
    credentials: "include"
  }),
  tagTypes: ['Investment'],
  endpoints: (builder) => ({
    deleteInvestmentAccount: builder.mutation({
      query: (id) => ({
        url: `/api/investment_account/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'investment_account', id}]
    }),
    createInvestmentAccount: builder.mutation({
      query: (body) => ({
        url: '/api/investment_account',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'investment_account', id: 'LIST' }]
    }),
    updateInvestment: builder.mutation({
            query: (body) => ({
                url: '/api/investment_account',
                method: 'PUT',
                body
            }),
            invalidatesTags: [{type: 'Deposit', id: 'LIST'}]
        }),
    getInvestmentAccount: builder.query({
      query: (owner_id) => ({
        url:`/api/investment_account/${owner_id}`
        }),
      transformResponse: (response) => response.investment_account,
      providesTags: (result) => {
        const tags = [{ type: 'investment_account', id: 'LIST' }]
        if (!result) return tags;
        return [
          ...result.map(({id}) => ({type: 'investment_account', id})),
          ...tags
        ]
      }
    })
  }),
})

export const {
  useCreateInvestmentAccountMutation,
  useDeleteInvestmentAccountMutation,
  useUpdateInvestmentMutation,
  useGetInvestmentAccountQuery
} = investmentAccountApi;
