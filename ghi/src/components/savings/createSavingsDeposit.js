import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function CreateSavingsDepositForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        institution: '',
    })

  const fetchData = async () => {
      const url = "http://localhost:8000/api/savings_account";
      const response = await fetch(url,
          {headers: {Authorization: `Bearer ${token}`}});
      if (response.ok) {
          const data = await response.json();
          setFormData(data);
      }
  }
  useEffect(() => {
      if (token) fetchData();
  },[token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/api/savings_account";
    const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },

    };

        const response = await fetch(url, fetchConfig);
        if (token && response.ok) {
            setFormData({
                date: '',
                amount: '',
                institution: '',
                savings_account_id: null,
            }, [token]);
        }
    };

  const handleChange = (event) => {
      setFormData({
          ...formData,
          [event.target.name]: event.target.value
      })
  }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 font-monospace">
          <h1>Open a savings account</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input value={formData.date} onChange={handleChange} placeholder="YYYY-MM-DD" required type="text" name="date" id="date" className="form-control" />
              <label htmlFor="date">Date:</label>
              <input value={formData.date} onChange={handleChange} placeholder="YYYY-MM-DD" required type="text" name="date" id="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="amount">Deposit Amount:</label>
              <input value={formData.amount} onChange={handleChange} placeholder="0.00" required type="text" name="amount" id="amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="institution">Institution:</label>
              <input value={formData.institution} onChange={handleChange} placeholder="Institution name" required type="text" name="institution" id="institution" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="form-floating mb-3">
              <input value={formData.checking_account_id} onChange={handleChange} required type="text" name="savings_account_id" id="savings_account_id" className="form-control" />
              <label htmlFor="savings_account_id">Id:</label>
            </div>
            <button className="btn btn-primary">Deposit</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CreateSavingsDepositForm;
