import {useState, useEffect } from "react";

function SignUpForm() {
    const [models, setModels] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        username: '',
        password: '',
        address: '',
        phone: '',
        dob: ''
    })

    const fetchData = async () => {
        const url = "http://localhost:8000/api/users";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8000/api/users";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                email: '',
                full_name: '',
                username: '',
                password: '',
                address: '',
                phone: '',
                dob: '',
            })
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    console.log(formData)
    return (
        <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 font-monospace">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input value={formData.email} onChange={handleChange} placeholder="email" required type="text" name="email" id="email" className="form-control" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.full_name} onChange={handleChange} placeholder="full_name" required type="text" name="full_name" id="full_name" className="form-control" />
              <label htmlFor="full_name">Full Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.username} onChange={handleChange} placeholder="username" required type="text" name="username" id="username" className="form-control" />
              <label htmlFor="color">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.password} onChange={handleChange} placeholder="password" required type="text" name="password" id="password" className="form-control" />
              <label htmlFor="color">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.address} onChange={handleChange} placeholder="address" required type="text" name="address" id="address" className="form-control" />
              <label htmlFor="color">address</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.phone} onChange={handleChange} placeholder="phone" required type="text" name="phone" id="phone" className="form-control" />
              <label htmlFor="color">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.dob} onChange={handleChange} placeholder="dob" required type="text" name="dob" id="dob" className="form-control" />
              <label htmlFor="color">DOB</label>
            </div>
            {/* <div className="form-floating mb-3">
              <input value={formData.checking} onChange={handleChange} placeholder="checking" required type="text" name="checking" id="checking" className="form-control" />
              <label htmlFor="color">Checking</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.savings} onChange={handleChange} placeholder="savings" required type="text" name="savings" id="savings" className="form-control" />
              <label htmlFor="color">Savings</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.investment} onChange={handleChange} placeholder="investment" required type="text" name="investment" id="investment" className="form-control" />
              <label htmlFor="color">Investment</label>
            </div> */}
            <button className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    )

}

export default SignUpForm;
