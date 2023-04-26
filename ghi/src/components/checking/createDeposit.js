import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function CreateDepositForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        institution: '',
    })

    const fetchData = async () => {
        const url = "http://localhost:8000/api/checking_account";
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
        const url = "http://localhost:8000/api/checking_account";
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
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        <div className="mt-8">
          <h1>Create a Deposit</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <label htmlFor="date">Date:</label>
              <input value={formData.date} onChange={handleChange} placeholder="YYYY-MM-DD" required type="text" name="date" id="date" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="amount">Deposit Amount:</label>
              <input value={formData.amount} onChange={handleChange} placeholder="0.00" required type="text" name="amount" id="amount" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="institution">Institution:</label>
              <input value={formData.institution} onChange={handleChange} placeholder="Institution name" required type="text" name="institution" id="institution" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <button className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Deposit</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CreateDepositForm;
