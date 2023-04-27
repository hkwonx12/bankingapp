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
    }, [token]);

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
            });
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
    <div className="w-full max-w-xs">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="block text-gray-700 text-sm font-bold mb-2" >Create a Savings Deposit</h1>
          <form onSubmit={handleSubmit} id="create-deposit-form">
            <div className="mb-6">
              <label htmlFor="date">Date:</label>
              <input value={formData.date || ''} onChange={handleChange} placeholder="YYYY-MM-DD" required type="date" name="date" id="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="amount">Deposit Amount:</label>
              <input value={formData.amount || ''} onChange={handleChange} placeholder="0.00" required type="text" name="amount" id="amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="institution">Institution:</label>
              <input value={formData.institution || ''} onChange={handleChange} placeholder="Institution name" required type="text" name="institution" id="institution" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
            <button className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Deposit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CreateSavingsDepositForm;
