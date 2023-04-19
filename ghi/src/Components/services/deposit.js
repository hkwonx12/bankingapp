import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const depositApi = createApi ({
    reducerPath: 'depositApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_API_HOST}`,
        credentials: "include"
    }),
    tagTypes: ['Deposit'],
    endpoints: (builder) => ({
        createDeposit: builder.mutation({
            query: (body) => ({
                url: '/api/transactions',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Deposit', id: 'LIST'}]
        }),
    getDeposits: builder.query({
        query: () => '/api/transactions',
        transformResponse: (response) => response.deposit,
        providesTags: (result) => {
            const tags = [{type: 'Deposit', id: 'LIST'}]
            if (!result) return tags;
            return [
                ...result.map(({id}) => ({type: 'Deposit', id: 'LIST'})),
                ...tags
            ]
        }
    }),
    })
})
export const {
    useCreateDepositMutation,
    useGetDepositsQuery,
} = depositApi;
