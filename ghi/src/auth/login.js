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
    <div className="card text-bg-light mb-3">
        <h5 className="card-header">Login Here</h5>
        <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
                name="username"
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
                name="password"
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div>
             <button onClick={handleSubmit} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0">Login</button>
            </div>
        </form>
        </div>
    </div>
    );
};

export default LoginForm;
