import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const getToken = () => {
    return localStorage.getItem("token");
}

export const checkingAccountApi = createApi({
  reducerPath: 'CheckingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}`,
    credentials: "include",
    headers: {
      'authorization': `Bearer ${getToken()}`
    }
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
    updateChecking: builder.mutation({
            query: (body) => ({
                url: '/api/checking_account',
                method: 'PUT',
                body
            }),
            invalidatesTags: [{type: 'Deposit', id: 'LIST'}]
        }),
    getCheckingAccount:builder.query({
            query: () => '/api/checking_account',
            transformResponse: (response) => {
            console.log(response)
            return response.id
        },
            providesTags: (result) => {
                const tags = [{type: 'Savings', id: 'LIST'}]
                if (!result) return tags;
                return [
                    ...result.map[({id}) => ({type: 'Savings', id: 'LIST'})],
                    ...tags
                ]
            }
        }),
    // getCheckingAccount: builder.query({
    //   query: () => `/api/checking_account/${owner_id}`,
    //   transformResponse: (response) => response.checking_account,
    //   providesTags: (result) => {
    //     const tags = [{ type: 'checking_account', id: 'LIST' }]
    //     if (!result) return tags;
    //     return [
    //       ...result.map(({id}) => ({type: 'checking_account', id})),
    //       ...tags
    //     ]
    //   }
    // })
  }),
})

export const {
  useCreateCheckingAccountMutation,
  useDeleteCheckingAccountMutation,
  useUpdateCheckingMutation,
  useGetCheckingAccountQuery
} = checkingAccountApi;
