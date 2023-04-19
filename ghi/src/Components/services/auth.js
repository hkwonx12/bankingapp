
import { createApi, fetchBaseQuery }from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_API_HOST}`,
        credentials: 'include' // sends cookie to FastAPI
    }),
    endpoints: (builder) =>({
        getUser: builder.query({
            query: () => '/token',
            transformResponse: (response) => response?.user,
            providesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url:'/token',
                method: 'DELETE'
            }),
            invalidatesTags: ['User', { type: 'User', id: 'LIST' }]
        })
    }),
})

export const { useGetUserQuery, useLogoutMutation } = authApi;