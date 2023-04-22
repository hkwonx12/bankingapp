import {useState, useEffect} from 'react'


const SavingsDetail = () => {
    const [accounts, setAccounts] = useState([])

    const getData = async () => {
        const url = 'http://localhost:8000/api/savings_account/'
        const request = await fetch(url, {
        // prepareHeaders: { Authorization: `Bearer ${token}` },
         // Other fetch options, like method and body, if applicable
    });
        // if (request.ok) {
        //     const data = await resp.json()
        //     setAccounts(data.accounts)
        //     console.log(data.accounts)
        // }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => {
              return (
                <tr key={account.id}>
                  <td>{ account.id }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}
export default SavingsDetail;
