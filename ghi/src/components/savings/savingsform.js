import { useState, useEffect } from "react";

function SavingsAccountForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    total_amount: "",
    interest_rate: "",
    account_number: "",
    routing_number: "",
    owner_id: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8000/api/savingsaccount";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/api/savingsaccounts";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        total_amount: "",
        interest_rate: "",
        account_number: "",
        routing_number: "",
        owner_id: "",
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 font-monospace">
          <h1>Saving Account</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                value={formData.total_amount}
                onChange={handleChange}
                placeholder="total_amount"
                required
                type="text"
                name="total_amount"
                id="total_amount"
                className="form-control"
              />
              <label htmlFor="total_amount">Total Amount</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.total_amount}
                onChange={handleChange}
                placeholder="total_amount"
                required
                type="text"
                name="total_amount"
                id="total_amount"
                className="form-control"
              />
              <label htmlFor="total_amount">Interest Rate</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.interest_rate}
                onChange={handleChange}
                placeholder="interest_rate"
                required
                type="text"
                name="interest_rate"
                id="interest_rate"
                className="form-control"
              />
              <label htmlFor="color">Account Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.account_number}
                onChange={handleChange}
                placeholder="account_number"
                required
                type="text"
                name="account_number"
                id="account_number"
                className="form-control"
              />
              <label htmlFor="color">Routing Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.routing_number}
                onChange={handleChange}
                placeholder="routing_number"
                required
                type="text"
                name="routing_number"
                id="routing_number"
                className="form-control"
              />
              <label htmlFor="color">Owner ID</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.owner_id}
                onChange={handleChange}
                placeholder="owner_id"
                required
                type="text"
                name="owner_id"
                id="owner_id"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SavingsAccountForm;
