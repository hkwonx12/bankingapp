import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const getToken = () => {
    return localStorage.getItem("token");
}

export const savingsApi = createApi ({
    reducerPath: 'savingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_API_HOST}`,
        credentials: "include",
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    }),
    tagTypes: ['Savings'],
    endpoints: (builder) => ({
        getSavings: builder.query({
            query: () => '/api/savings_account',
            transformResponse: (response) => {
            console.log(response)
            return response
        },
            providesTags: (result) => {
                const tags = [{type: 'Savings', id: 'LIST'}]
                if (!result) return tags;
                return [
                    ...result.map(({id}) => ({type: 'Savings', id: 'LIST'})),
                    ...tags
                ]
            }
        }),
    createSavings: builder.mutation({
        query: (body) => ({
            url: '/api/savings_account',
            method: 'POST',
            body
        }),
        invalidatesTags: [{type: 'Savings', id: 'LIST'}]
    }),
    updateSavings: builder.query({
        query: (body) => ({
            url: '/api/savings_account',
            method: 'PUT',
            body
        }),
        invalidatesTag: [{type: 'Savings', id: 'LIST'}]
    }),
    deleteSavings: builder.mutation({
        query: (id) =>({
            url:`/api/savings_account/${id}`,
            method: 'DELETE'
        }),
        invalidatesTag: (result, error, {id}) => [{type: 'Savings', id}]
    })
    })
})
export const {
    useGetSavingsQuery,
    useCreateSavingsMutation,
    useUpdateSavingsQuery,
    useDeleteSavingsMutation,
} = savingsApi;
