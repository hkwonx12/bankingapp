import React from "react";
import { useGetUserQuery } from "./services/users"
import UserItem from "./UserItem"

const Users = () => {
    const { data, isLoading } = useGetUserQuery()
    if (isLoading) return <div>Loading...</div>
    if (data?.length === 0) return <div>No things :</div>
    return (
        <ul>
            {data.map(thing => <UserItem key={thing.id} {...thing} />)}
        </ul>
    )
}

export default Users;
