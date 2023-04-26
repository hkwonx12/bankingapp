import { useEffect, useState } from "react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


function CreateCheckingAccountForm() {
    const {token} = useAuthContext();
    const [formData, setFormData] = useState({
        total_amount: '',
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
    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="offset-3 col-6">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          <h1>Open a checking account</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="flex flex-col mb-2">
              <label htmlFor="total_amount">Deposit Amount:</label>
              <input value={formData.dob} onChange={handleChange} placeholder="$0.00" required type="text" name="total_amount" id="total_amount" className="form-control" />
            </div>
            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-half transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Create</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CreateCheckingAccountForm;
