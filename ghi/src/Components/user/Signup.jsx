import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleFullNameChange, handlePasswordChange, handleUsernameChange, handleAddressChange,
    handleEmailChange, handlePhoneChange, handleDobChange, handleCheckingChange, handleSavingsChange,
    handleInvestmentChange, reset } from "../features/auth/signupSlice";
import { useSignupMutation } from '../services/users'
import ErrorNotification from '../ErrorNotification'

const Signup = () => {
    const dispatch = useDispatch()
    const [signup] = useSignupMutation()
    const { errorNotification, fields } = useSelector(state => state.signup)

    const handleSubmit = (e) => {
        e.preventDefault()
        const {full_name, username, password, address, phone, email, dob, checking, savings, investment } = fields;
        signup({
            full_name,
            address,
            phone,
            email,
            dob,
            checking,
            savings,
            investment,
            username,
            password
        })
        dispatch(reset())
    }
    console.log(fields)
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    {errorNotification && <ErrorNotification>{errorNotification}</ErrorNotification>}
                    <div className="mb-3">
                        <label htmlFor="Signup__fullname" className='form-label'>
                            Full Name:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`fullname`}
                            id='Signup__fullname'
                            value={fields.full_name}
                            onChange={e => dispatch(handleFullNameChange(e.target.value))}
                        />
                    </div>
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
                        <label htmlFor="Signup__address" className='form-label'>
                            Address:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`address`}
                            id='Signup__address'
                            value={fields.address}
                            onChange={e => dispatch(handleAddressChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__phone" className='form-label'>
                            Phone:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`phone`}
                            id='Signup__phone'
                            value={fields.phone}
                            onChange={e => dispatch(handlePhoneChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__email" className='form-label'>
                            Email:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`email`}
                            id='Signup__email'
                            value={fields.email}
                            onChange={e => dispatch(handleEmailChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__dob" className='form-label'>
                            DOB:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`dob`}
                            id='Signup__dob'
                            value={fields.dob}
                            onChange={e => dispatch(handleDobChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup_checking" className='form-label'>
                            Checking Account:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`checking`}
                            id='Signup__checking'
                            value={fields.checking}
                            onChange={e => dispatch(handleCheckingChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__savings" className='form-label'>
                            Savings:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`savings`}
                            id='Signup__savings'
                            value={fields.savings}
                            onChange={e => dispatch(handleSavingsChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__investment" className='form-label'>
                            Investment:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`investment`}
                            id='Signup__investment'
                            value={fields.investment}
                            onChange={e => dispatch(handleInvestmentChange(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
