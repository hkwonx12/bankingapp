import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import useToken from "@galvanize-inc/jwtdown-for-react";

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


    const { logout } = useToken();
    const navigate = useNavigate()

    function myLogout() {
        logout();
        navigate("/");
    }
    return (
        <>
        <div className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
            <h1 className="text-white text-lg font-bold font-serif">Croissant United Bank</h1>
        </div>
        <br/>
        <div className=" ml-10 mt-0 rounded-2xl pl-25 bg-purple-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 w-1/2 lg:py-16"><Link to="/checking">
          <div className=" pl-10 sm:p-10 lg:flex-auto">
            <h1 className="pb-10-0 text-center font-medium pb-5">Checking Account</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="pr-10">Routing Number</th>
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
        </Link>
        </div>
        <div className="fixed top-13 right-0 h-64 w-64 bg-purple-50 text-center text-black shadow-lg rounded-2xl">
          <ul className="mt-5"><Link to="/checkingdeposit">Make A Deposit</Link></ul>
           <button onClick={myLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent
            hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Log Out</button>
        </div>
        </>
    );
}


export default CheckingAccount;
