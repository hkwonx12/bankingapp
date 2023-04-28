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
        if (response.ok){
            const Data = await response.json();
            setInvestmentData(Data)
        }

    };
    const getTransactionData = async () => {
        const response = await fetch('http://localhost:8000/api/transactions',
        {headers: {Authorization: `Bearer ${token}`}})
        if (response.ok){
            const Data = await response.json()
            setTransactionData(Data)
        }
    }

    useEffect(() => {
        if (token){
            getData();
            getTransactionData();
        }
    }, [token]);

    useEffect(() => {
        if (investmentData && transactionData) {
            const currentTotalAmount = investmentData[0].total_amount
            const oldValues = [currentTotalAmount]
            for (let i = transactionData.length - 1; i>= 0 && oldValues.length < 10; i--){
                const previousValue = oldValues[oldValues.length - 1] - transactionData[i].amount
                oldValues.push(previousValue)
            }
            setChartData({
                labels: oldValues.reverse().map((_, i) => `MoneyToday-${oldValues.length -i - 1}`),
                datasets: [{
                    label: 'Investment Account Data',
                    data: oldValues,
                    fill: false,
                    borderColor: '#69DDFF',
                    backgroundColor: '#69DDFF',

                }]
            })

        }
    }, [investmentData, transactionData])


    return (
        <div>
            {chartData && <Line data={chartData} />}
        </div>
    )
}


export default InvestmentDayChangeHistory;
