import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import CreateInvestmentDepositForm from './investmentDeposit';

function InvestmentAccountDetail() {
    const {token} = useAuthContext();
    const [accounts, setAccounts] = useState([]);

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/investment_account/`,
        {headers: {Authorization: `Bearer ${token}`}});

        if (response.ok){
            const data = await response.json();
            setAccounts(data)
        }
    };


    useEffect(() => {
        if (token) getData();
    }, [token]);

    return (
        <>
        <br/>
        <div className=" ml-10 mt-0 rounded-2xl pl-25 bg-purple-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 w-1/2 lg:py-16"><Link to="/investment/statements">
          <div className=" pl-10 sm:p-10 lg:flex-auto">
            <h1 className="pb-10-0 text-center font-medium pb-5">Investment Account</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="pr-10">Total Amount</th>
                            <th>Investment Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{account.total_amount}</td>
                                    <td>{account.investment_value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </Link>
      </div>
    </>
    )
}


export default InvestmentAccountDetail;
