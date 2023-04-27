import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';

function InvestmentDayChangeHistory() {
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

    return (
        <div>
            <h1>Your Investment Account Statements</h1>
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
            </div>
        </div>
    )
}


export default InvestmentDayChangeHistory;
