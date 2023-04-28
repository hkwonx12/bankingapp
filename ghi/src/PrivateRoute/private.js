import React from "react"
import { Navigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";


const PrivateRoute = ({ children }) => {
    const { login } = useToken();
    const { token } = useToken();

    return token ? children : <Navigate to="/" />
}
export default PrivateRoute;
