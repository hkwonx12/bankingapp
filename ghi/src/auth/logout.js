import useToken from "@galvanize-inc/jwtdown-for-react";

function Logout(){
    const { logout } = useToken();
    logout();
}

export default Logout;

