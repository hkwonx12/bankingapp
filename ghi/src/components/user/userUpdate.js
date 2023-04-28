import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function UpdateUserForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        address: '',
        phone: ''
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
            phone: ''
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">Edit your account</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">Full Name:</label>
                <input value={formData.full_name} onChange={handleChange} placeholder="Croissant Doe" required type="text" name="full_name" id="full_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input value={formData.email} onChange={handleChange} placeholder="example@example.com" required type="text" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
                <input value={formData.address} onChange={handleChange} placeholder="221B Baker Street" required type="text" name="address" id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone number:</label>
                <input value={formData.phone} onChange={handleChange} placeholder="xxx-xxx-xxxx" required type="text" name="phone" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <button className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UpdateUserForm;
