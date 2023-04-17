import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handlePasswordChange, handlePasswordConfirmationChange, handleUsernameChange, reset, error } from "./features/auth/signupSlice";
import { useSignupMutation } from './services/users'
import ErrorNotification from './ErrorNotification'

const Signup = () => {
    const dispatch = useDispatch()
    const [signup] = useSignupMutation()
    const { errorNotification, fields } = useSelector(state => state.signup)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (fields.password !== fields.passwordConfirmation) {
            dispatch(error('Password does not match confirmation'))
            return;
        }
        const { username, password } = fields;
        signup({
            username,
            password
        })
        dispatch(reset())
    }

    return (
        <div className="card">
            {false && 'HI'}
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    {errorNotification && <ErrorNotification>{errorNotification}</ErrorNotification>}
                    <div className="mb-3">
                        <label htmlFor="Signup__username" className='form-label'>
                            Username:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Signup__username'
                            value={fields.username}
                            onChange={e => dispatch(handleUsernameChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password" className='form-label'>
                            Password:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`password`}
                            id='Signup__password'
                            value={fields.password}
                            onChange={e => dispatch(handlePasswordChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password_confirmation" className='form-label'>
                            Confirm Password:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`password`}
                            id='Signup__password_confirmation'
                            value={fields.passwordConfirmation}
                            onChange={e => dispatch(handlePasswordConfirmationChange(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
