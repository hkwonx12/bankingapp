import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function User() {
    const {token} = useAuthContext();
    const [users, setUsers] = useState([]);

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/users/`,
        {headers: {Authorization: `Bearer ${token}`}});

        if (response.ok){
            const data = await response.json();
            setUsers(data)
        }
    };


    useEffect(() => {
        if (token) getData();
    }, [token]);


    return (
        <div className="flex items-center justify-center h-screen">
            <h1>Your Information</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.full_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.dob}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User;
