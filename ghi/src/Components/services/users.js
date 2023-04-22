import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
            transformResponse: (response) => response?.user,
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
        transformResponse: (response) => {
            console.log(response);
            localStorage.setItem("token", response.access_token);
        },
        invalidatesTag: ['User']
    }),
    signup: builder.mutation({
        query: (body) => {
            return {
                url: '/api/users',
                method: 'POST',
                body,
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
        invalidatesTag: [{type: 'Users', user_id: 'LIST'}]
    }),
    getUsers: builder.query({
        query: () => '/api/users',
        transformResponse: (response) => response.users,
        providesTags: (result) => {
            const tags = [{type: 'Users', user_id: 'LIST'}]
            if (!result) return tags;
            return [
                ...result.map(({user_id}) => ({type: 'Users', user_id})),
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
useGetUsersQuery
} = usersApi;
