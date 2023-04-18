import React from "react";
import { useGetUsersQuery } from "../services/users"
import UserItem from "./UserItem"

const User = () => {
    const { data, isLoading } = useGetUsersQuery([])
    console.log(data)
    if (isLoading) return <div>Loading...</div>
    if (data?.length === 0) return <div>No user:</div>
    return (
        <ul>
            {data.map(user => {<UserItem key={user.user_id} {...user} />})}
        </ul>
    )
}

export default User;
