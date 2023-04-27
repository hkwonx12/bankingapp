import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import CreateInvestmentDepositForm from './investmentDeposit';

function InvestmentStatements() {
    const {token} = useAuthContext();
    const [statements, setStatements] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/transactions',
        {headers: {Authorization: `Bearer ${token}`}});

        if (response.ok){
            const data = await response.json();
            setStatements(data)
        }
    };

    useEffect(() => {
        if (token) getData();
    }, [token]);

    const getStatementsFiltered = () => {
        return statements.filter((statement) =>
            statement['investment_account_id'] ==true && statement['savings_account_id'] == null && statement['checking_accout_id'] == null
        );
    }


    return (
        <section className="h-screen">
        <Link to="/mainpage" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">MainPage</Link>
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <div className="p-5 h-screen bg-gray-100">
                            <h1 className="text-xl mb-2 font-serif text-left">Your Investment Account Statements</h1>
                            <button className="pl-50">
                            </button>
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr className="bg-purple-300">
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Institution</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getStatementsFiltered() && getStatementsFiltered().map((statement) => {
                                            return (
                                                <tr className="even:bg-purple-100 odd:bg-slate-50" key={statement.id}>
                                                    <td className=" p-3 text-sm text-gray-700">{new Date(statement.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                                                    <td className=" p-3 text-sm text-gray-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(statement.amount)}</td>
                                                    <td className=" p-3 text-sm text-gray-700">{statement.institution}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-8/12 lg:ml-6 lg:w-3/12">
                            <CreateInvestmentDepositForm />
                        </div>
                    </div>
                </div>
        </section>
    )
}


export default InvestmentStatements;
