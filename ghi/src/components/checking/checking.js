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
//when useEffect, return gets rendered
//then runs what is in the function
//if [token] was [], it would only run one time
//but since we passed a token, this gets run everytime token gets changed
//so run 1 time initially + everytime token gets changed -> solving the issue with token disappearing after refreshing the pages
//this is an issue because it is async because its going to take time for token to get data back from backend

    return (
        <div>
            <h1>Your Checking Account Statements</h1>
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
                                    <td>{statement.date}</td>
                                    <td>{statement.amount}</td>
                                    <td>{statement.insitution}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default CheckingStatements;
