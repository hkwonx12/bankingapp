import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';

function CheckingStatements() {
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
            statement['checking_account_id'] = !null && statement['savings_account_id'] == null && statement['investment_accout_id'] == null
        );
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <h1>Your Checking Account Statements</h1>
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                        <tr className='border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700'>
                                            <th>date</th>
                                            <th>amount</th>
                                            <th>institution</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getStatementsFiltered() && getStatementsFiltered().map((statement) => {
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
                </div>
            </div>
        </div>
    )
}


export default CheckingStatements;
