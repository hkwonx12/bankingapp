import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";

function SavingsAccount() {
  const { token } = useAuthContext();
  const [accounts, setAccounts] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8000/api/savings_account/',
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
    <div>
      <h1>Your Savings Account</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((account) => {
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
  );
}

export default SavingsAccount;
