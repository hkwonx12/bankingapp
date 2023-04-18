import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handlePasswordChange, handleUsernameChange, reset} from "./features/auth/loginSlice"
import { useLoginMutation } from "./services/users";

const Login = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const { fields } = useSelector(state => state.login)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit');
        console.log({fields});
        login(fields)
        dispatch(reset())
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Login__username" className="form-label">
                            Username:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={'text'}
                            id='Login__username'
                            value={fields.username}
                            onChange={e => dispatch(handleUsernameChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Login__password" className='form-label'>
                            Password:
                        </label>
                        <input
                        className="form-control form=control-sm"
                        type={'password'}
                        id='Login__password'
                        value={fields.password}
                        onChange={e => dispatch(handlePasswordChange(e.target.value))}
                        />
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login
