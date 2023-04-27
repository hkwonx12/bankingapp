import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

function InvestmentDayChangeHistory() {
    const {token} = useAuthContext();
    const [investmentData, setInvestmentData] = useState('');
    const [transactionData, setTransactionData] = useState('')
    const [chartData, setChartData] = useState('')

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/investment_account',
        {headers: {Authorization: `Bearer ${token}`}});
        console.log('response', response)
        if (response.ok){
            const Data = await response.json();
            console.log('investment', Data)
            setInvestmentData(Data)
        }

    };
    const getTransactionData = async () => {
        console.log('transaction data call')
        const response = await fetch('http://localhost:8000/api/transactions',
        {headers: {Authorization: `Bearer ${token}`}})
        console.log('response', response)
        if (response.ok){
            const Data = await response.json()
            console.log('Transaction',Data)
            setTransactionData(Data)
        }
    }

    useEffect(() => {
        console.log(token)
        if (token){
            getData();
            getTransactionData();
        }
    }, [token]);

    useEffect(() => {
        if (investmentData && transactionData) {
            const currentTotalAmount = investmentData[0].total_amount
            console.log(investmentData[0].total_amount)
            const oldValues = [currentTotalAmount]
            for (let i = transactionData.length - 1; i>= 0 && oldValues.length < 10; i--){
                const previousValue = oldValues[oldValues.length - 1] - transactionData[i].amount
                oldValues.push(previousValue)
            }
            console.log(oldValues)
            setChartData({
                labels: oldValues.reverse().map((_, i) => `MoneyToday-${oldValues.length -i - 1}`),
                datasets: [{
                    label: 'Investment Account Data',
                    data: oldValues,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',

                }]
            })

        }
    }, [investmentData, transactionData])


    return (
        <div>
            {/* <h1>Your Investment Account Statements</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>amount</th>
                            <th>institution</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statements && statements.map(statement => {
                            return (
                                <tr key={statement.id}>
                                    <td>{new Date(statement.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                                    <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(statement.amount)}</td>
                                    <td>{statement.institution}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div> */}
            {chartData && <Line data={chartData} />}
            {/* for some reason the chart data would not load fast enough so has to have conditional */}
        </div>
    )
}


export default InvestmentDayChangeHistory;
