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
        <div className="fixed top-13 right-0 h-30 w-64 bg-purple-50 text-center text-black shadow-lg rounded-2xl">
          <ul className="pb-10 hover:underline mt-5"><Link to="/user">User Info</Link></ul>
           <button onClick={myLogout} className="py-2 mb-5 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Log Out</button>
        </div>
        </>
    );
}


export default CheckingAccount;
