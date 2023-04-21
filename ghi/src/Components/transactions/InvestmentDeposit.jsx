import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  handleDateChange, handleAmountChange, handleInstitutionChange,
    handleInvestmentAccountIdChange, reset } from "../features/transactions/depositSlice";
import { useCreateDepositMutation, useGetDepositsQuery } from '../services/deposit'
import ErrorNotification from '../ErrorNotification'

const InvestmentDeposit = () => {
    const dispatch = useDispatch()
    const [deposit] = useCreateDepositMutation()
    const { errorNotification, fields } = useSelector(state => state.deposit)
    const { data } = useGetDepositsQuery([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const {date, amount, institution, investment_account_id, } = fields;
        deposit({
            date,
            amount,
            institution,
            investment_account_id
        })
        dispatch(reset())
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Create Deposit</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    {errorNotification && <ErrorNotification>{errorNotification}</ErrorNotification>}
                    <div className="mb-3">
                        <label htmlFor="Deposit__date" className='form-label'>
                            Date:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`date`}
                            id='Deposit__date'
                            value={fields.date}
                            onChange={e => dispatch(handleDateChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Deposit__amount" className='form-label'>
                            Amount:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`number`}
                            id='Deposit__amount'
                            value={fields.amount}
                            onChange={e => dispatch(handleAmountChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Depost__institution" className='form-label'>
                            Institution:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Depost__institution'
                            value={fields.institution}
                            onChange={e => dispatch(handleInstitutionChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Deposit__investment_account_id" className='form-label'>
                            Investment Account
                        </label>
                        <select
                            className="form-control form-control-sm"
                            type={`number`}
                            id='Deposit__investment_account_id'
                            value={fields.investment_account_id}
                            onChange={e => dispatch(handleInvestmentAccountIdChange(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Deposit</button>
                </form>
            </div>
        </div>
    )
}

export default InvestmentDeposit;
