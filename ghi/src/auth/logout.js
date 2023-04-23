import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Logout(){
    const { logout } = useToken();
    logout();

    // const url = "http://localhost:8000/token";
    // const fetchConfig = {
    //     method: "DELETE",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // const response = fetch(url, fetchConfig);
}

export default Logout;
