import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const {token} = useAuthContext();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        if (token) {
            localStorage.setItem("access_token", token)
            navigate("/mainpage");
        }
        e.target.reset();
    };

    return (
    <section className="h-screen">
        <div className="container h-full px-6 py-24">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                    <img
                        src="/CroissantLogo.PNG"
                        className="w-full"
                        alt="Bank Logo"/>
                </div>
                {/* right column container with form */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                <h5 className="block text-gray-700 text-sm font-bold mb-2">Login Here</h5>
                <div className="mb-4">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                            <input
                                name="username"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                            <input
                                name="password"
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={handleSubmit} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </section>

    );
};

export default LoginForm;
