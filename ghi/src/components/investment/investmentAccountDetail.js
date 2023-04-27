import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';


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
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        // for some reason only likes it in array
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
        console.log(newTotalAmount)
        console.log(formattedAmount)
    }

    useEffect(() => {
        if (token) {
            getData();
            getStockData();
            console.log(accounts[0].total_amount)
            const interval = setInterval(() => {
                handleInvestmentTotalUpdate(accounts[0].total_amount, stock.dp)
            }, 30000)
            return () => clearInterval(interval)
            }
    }, [token]);

    return (
        <div>
            <h1>Your Investment Account</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Total Amount</th>
                            <th>Investment Percentage Change</th>
                            {/* <th> Update Total</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.total_amount)}</td>
                                    <td>{stock.dp}</td>
                                    {/* <td><button className='btn btn-purple'onClick={() => handleInvestmentTotalUpdate(account, stock.dp)}>Update</button> </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default InvestmentAccountDetail;
