import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { handleNameChange, reset } from "./features/auth/newUserSlice"
import { useCreateUserMutation } from "./services/users"
import { handleFullNameChange } from "./features/user/newUserSlice"

const NewUser = () => {
    const dispatch = useDispatch()
    const [createUser] = useCreateUserMutation()
    const newUser = useSelector((state) => state.newUser)

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            createUser(newUser)
            dispatch(reset())
        }}>
            <div className="">
                <label htmlFor="name-field" className="">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name-field"
                    placeholder='User 1'
                    tabIndex={1}
                    value={newUser.name}
                    onChange={(e) => {
                        dispatch(handleNameChange(e.target.value))
                    }}
                    />

            </div>
            <button className="">Submit</button>
            {' '}
            <button className="" onClick={(e)=> {
                e.preventDefault
                dispatch(reset())
            }}>Reset</button>
        </form>
    )

}

export default NewUser;
