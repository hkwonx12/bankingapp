import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handlePasswordChange, handleUsernameChange, reset} from "../features/auth/loginSlice"
import { useLoginMutation } from "../services/users";

const Login = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const { fields } = useSelector(state => state.login)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handleSubmit');
        console.log({fields});
        login(fields);
        dispatch(reset())
        // localStorage.setItem("token", )
    }

    return (

        <div className="w-full max-w-xs">
            <h5 className="">Login</h5>
            <hr />
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Login__username">
                Username
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={'text'}
                id='Login__username'
                value={fields.username}
                onChange={e => dispatch(handleUsernameChange(e.target.value))}
                placeholder="Username" />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Login__password">
                Password
            </label>
            <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type={'password'}
                id='Login__password'
                value={fields.password}
                onChange={e => dispatch(handlePasswordChange(e.target.value))}
                placeholder="******************"/>
            </div>
            <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
            </button>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;2023 Croissant United Bank. All rights reserved.
        </p>
        </div>

    )
}
export default Login
