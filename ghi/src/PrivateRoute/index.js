import React from "react"
import { Navigate } from "react-router-dom";
import { useLocalState }

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return jwt ? children : <Navigate to="/"/>;
};
