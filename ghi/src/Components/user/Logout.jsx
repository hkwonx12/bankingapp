import { useLogoutMutation } from "../services/auth"

const Logout = () => {
    const [logout] = useLogoutMutation()
    return (
        <button
            className=""
            onClick={logout}
        >
            Logout
        </button>
    )
}



export default Logout
