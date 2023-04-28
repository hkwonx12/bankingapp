import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

function InvestmentAccountDetail() {
    const {token} = useAuthContext();
    const [accounts, setAccounts] = useState([]);
    const [stock, setStock] = useState([])

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/investment_account/`,
        {headers: {Authorization: `Bearer ${token}`}});

        if (response.ok){
            const data = await response.json();
            setAccounts(data)
        }

    };

    const getStockData = async () => {
        const response = await fetch(`http://localhost:8000/api/stock/QQQ`)

        if (response.ok){
            const data = await response.json();
            setStock(data)
        }
    };

    const handleInvestmentTotalUpdate = async (account, percentageChange) => {
        const newTotalAmount = account.total_amount * (1 + percentageChange / 100)
        const amount = newTotalAmount - account.total_amount;
        const formattedAmount = parseFloat(amount.toFixed(2))
        setAccounts([{...account, total_amount: newTotalAmount}])
        const url = `http://localhost:8000/api/investment_account/`
        const fetchConfigs = {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date: new Date().toISOString().slice(0,10),
                amount: formattedAmount,
                institution: "Internal Bank Update"
            })
        }
        const response = await fetch(url, fetchConfigs)
    }

    useEffect(() => {
        if (token) {
            getData();
            getStockData();
            const interval = setInterval(() => {
                accounts && accounts.map(account => handleInvestmentTotalUpdate(account, stock.dp))
            }, 330000)
            return () => clearInterval(interval)
            }
    }, [token],[accounts]);

    return (
        <>
        <br/>
    <div className=" ml-10 mt-0 rounded-2xl pl-25 bg-purple-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 w-1/2 lg:py-16">
        <Link to="/investment/statements">
          <div className=" pl-10 sm:p-10 lg:flex-auto">
            <h1 className="pb-10-0 text-center font-medium pb-5">Investment Account</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                            <th className="pr-10">Total Amount</th>
                            <th>Investment Percentage Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.total_amount)}</td>
                                    <td>{stock.dp}</td>
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
