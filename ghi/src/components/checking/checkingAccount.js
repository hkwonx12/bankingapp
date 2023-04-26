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
            console.log(data)
        }
    };


    useEffect(() => {
        if (token) getData();
    }, [token]);

    return (
        <div>
            <h1>Your Checking Account</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => {
                            return (
                                <tr key={account.id}>
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
