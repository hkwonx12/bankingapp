import { useLogoutMutation } from "./services/auth"

const Logout = () => {
    const [logout] = useLogoutMutation()
    return (
        <button
            className=""
        >
            Logout
        </button>
    )
}



export default Logout
