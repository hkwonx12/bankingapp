import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function UpdateUserForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        address: '',
        phone: '',
    })

    const fetchData = async () => {
        const url = "http://localhost:8000/api/users";
        const response = await fetch(url,
            {headers: {Authorization: `Bearer ${token}`}});
        if (response.ok) {
            const data = await response.json();
            setFormData(data);
        }
    }
    useEffect(() => {
        if(token) fetchData();
    }, [token]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const url="http://localhost:8000/api/users";
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
            email: '',
            full_name: '',
            address: '',
            phone: '',
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
          <h1>Edit your account</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <label htmlFor="full_name">Name:</label>
              <input value={formData.full_name} onChange={handleChange} placeholder="example@example.com" required type="text" name="full_name" id="full_name" className="form-control" />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="email">Email:</label>
              <input value={formData.email} onChange={handleChange} placeholder="example@example.com" required type="text" name="email" id="email" className="form-control" />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="address">Address:</label>
              <input value={formData.address} onChange={handleChange} placeholder="example@example.com" required type="text" name="address" id="address" className="form-control" />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="phone">Phone number:</label>
              <input value={formData.phone} onChange={handleChange} placeholder="example@example.com" required type="text" name="phone" id="phone" className="form-control" />
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default UpdateUserForm;
