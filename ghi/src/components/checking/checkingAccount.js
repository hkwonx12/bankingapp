import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';


function CheckingAccount() {
    const {token} = useAuthContext();
    const [accounts, setAccounts] = useState([]);

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/checking_account/`,
        {headers: {Authorization: `Bearer ${token}`}});

        if (response.ok){
            const data = await response.json();
            setAccounts(data)
        }
    };


    useEffect(() => {
        if (token) getData();
    }, [token]);
//when useEffect, return gets rendered
// then runs what is in the function
// if [token] was [], it would only run one time
// but since we passed a token, this gets run everytime token gets changed
// so run 1 time initially + everytime token gets changed -> solving the issue with token disappearing after refreshing the pages
// this is an issue because it is async because its going to take time for token to get data back from backend

    return (
        <div>
            <h1>Your Checking Account</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Routing Number</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{account.routing_number}</td>
                                    <td>{account.total_amount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default CheckingAccount;
