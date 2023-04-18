import { useLogoutMutation } from "./services/auth"

const Logout = () => {
    const [logout] = useLogoutMutation()
    return (
        <button
            className="btn btn-danger"
            onClick={logout}
        >
            Logout
        </button>
    )
}



export default Logout
