import {useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link} from "react-router-dom";

function SignUpForm() {
  const { login } = useToken();
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
      email: '',
      full_name: '',
      username: '',
      password: '',
      address: '',
      phone: '',
      dob: ''
  });

  const fetchData = async () => {
      const url = "http://localhost:8000/api/all_users";
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
        }
      };


    const response = await fetch(url, fetchConfig);
    console.log(response)
    const data = await response.json();
    console.log(data)
    localStorage.setItem("access_token", data.access_token)
    if (response.ok) {
        login(formData.username, formData.password);
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


    return (
    <div className="flex items-center justify-center h-screen">
        <img
        src = "/DoughtoDollars.jpeg"
        className="w-half"
        alt="doughtodollars"
        />
      <div className="w-full max-w-xs">
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">Sign Up</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input value={formData.email} onChange={handleChange} placeholder="email" required type="text" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">Full Name</label>
                <input value={formData.full_name} onChange={handleChange} placeholder="full_name" required type="text" name="full_name" id="full_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Username</label>
                <input value={formData.username} onChange={handleChange} placeholder="username" required type="text" name="username" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Password</label>
                <input value={formData.password} onChange={handleChange} placeholder="password" required type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">address</label>
                <input value={formData.address} onChange={handleChange} placeholder="address" required type="text" name="address" id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Phone Number</label>
                <input value={formData.phone} onChange={handleChange} placeholder="phone" required type="text" name="phone" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="form-floating mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">DOB</label>
                <input value={formData.dob} onChange={handleChange} placeholder="dob" required type="date" name="dob" id="dob" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <button onClick={handleSubmit} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Sign Up</button>
            </form>
          </div>

            <Link to="/createaccounts" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Click here to start your bank accounts</Link>

        </div>
      </div>
    </div>
  );
}


export default SignUpForm;
