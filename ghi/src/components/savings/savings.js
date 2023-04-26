import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";

function SavingsStatements() {
  const { token } = useAuthContext();
  const [statements, setStatements] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/transactions",
      {headers: { Authorization: `Bearer ${token}` }});


    if (response.ok) {
      const data = await response.json();
      setStatements(data);
    }
  };

  useEffect(() => {
    if (token) getData();
  }, [token]);

      const getStatementsFiltered = () => {
        return statements.filter((statement) =>
          statement["savings_account_id"] = !null && statement["checking_account_id"] == null && statement["investment_accout_id"] == null
        );
      };


  return (
    <div>
      <h1>Your Savings Account Statements</h1>
      <div className='container'>
        <table>
          <thead>
            <tr>
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
  );
}

export default SavingsStatements;
