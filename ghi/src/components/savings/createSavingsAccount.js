import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function CreateSavingsAccountForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        total_amount: '',
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
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8000/api/savings_account";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        };

        const response = await fetch(url, fetchConfig);
        if (token && response.ok) {
            setFormData({
                total_amount: '',
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
              <input value={formData.dob} onChange={handleChange} placeholder="$0.00" required type="text" name="total_amount" id="total_amount" className="form-control" />
              <label htmlFor="total_amount">Deposit Amount:</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CreateSavingsAccountForm;
