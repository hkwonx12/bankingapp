import React from "react";
import { useDeleteUserMutation } from "./services/users";

const UserItem = ({user_id, name}) => {
    const [deleteUser] = useDeleteUserMutation()
    return (
        <li>
            {name}
            {` `}
            <button
                className="btn btn-sm btn-danger"
                onClick={(e) => deleteUser(user_id)}
                >Delete
            </button>
        </li>
    )
}
export default UserItem;
