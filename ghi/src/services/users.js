import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const usersApi = createApi ({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_API_HOST}`,
        credentials: "include"
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/token',
            transformResponse: (response) => response?.account,
            provideTags: ['User']
        }),
    login: builder.mutation({
        query: (body) => {
            const formData = new FormData()
            formData.append('username', body.username)
            formData.append('password', body.password)
            return {
                url:'/token',
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTag: ['User']
    }),
    signup: builder.mutation({
        query: (body) => {
            const formData = new FormData()
            formData.append('username', body.username)
            formData.append('password', body.password)
            return {
                url: '/api/users',
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['User']
    }),
    logout: builder.mutation({
        query: () => ({
            url:'/token',
            method: 'DELETE'
        }),
        invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
        query: (user_id)=>({
            url:`/api/users/${user_id}`,
            method: 'DELETE'
        }),
        invalidatesTag: (result, error, {user_id}) => [{type: 'Users', user_id}]
    }),
    createUser:builder.mutation({
        query: (body) => ({
            url: '/api/users',
            method: 'POST',
            body
        }),
        invalidatesTag: [{type: 'Users', id: 'LIST'}]
    }),
    getUsers: builder.query({
        query: () => '/api/users',
        transformResponse: (response) => response.users,
        providesTags: (result) => {
            const tags = [{type: 'Users', id: 'LIST'}]
            if (!result) return tags;
            return [
                ...result.map(({id}) => ({type: 'Users', id})),
                ...tags
            ]
        }
    })
    }),
})
export const {
useGetUserQuery,
useLoginMutation,
useSignupMutation,
useLogoutMutation,
useDeleteUserMutation,
useCreateUserMutation,
} = usersApi;
