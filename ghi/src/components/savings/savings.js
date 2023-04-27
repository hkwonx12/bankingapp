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
    <div className="p-5 h-screen bg-gray-100">
            <h1 className="text-xl mb-2 font-serif text-left">Your Savings Account Statements</h1>

                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr className="bg-purple-300">
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Institution</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getStatementsFiltered() && getStatementsFiltered().map((statement) => {
                            return (
                                <tr className="bg-purple-100 underline-offset-0" key={statement.id}>
                                    <td className=" p-3 text-sm text-gray-700">{new Date(statement.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                                    <td className=" p-3 text-sm text-gray-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(statement.amount)}</td>
                                    <td className=" p-3 text-sm text-gray-700">{statement.institution}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
  );
}

export default SavingsStatements;
