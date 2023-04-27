import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function SavingsAccount() {
  const { token } = useAuthContext();
  const [accounts, setAccounts] = useState([]);

  const getData = async () => {
    const response = await fetch(
      'http://localhost:8000/api/savings_account',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.ok) {
      const data = await response.json();
      setAccounts(data);
    }
  };

  useEffect(() => {
    if (token) getData();
  }, [token]);


  return (
    <>
        <br/>
        <div className=" ml-10 mt-0 rounded-2xl pl-25 bg-purple-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 w-1/2 lg:py-16"><Link to="/savings">
          <div className=" pl-10 sm:p-10 lg:flex-auto">
            <h1 className="pb-10-0 text-center font-medium pb-5">Savings Account</h1>
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
    </>
  );
}

export default SavingsAccount;
