import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateUserForm from './userUpdate';


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
      <section className="h-screen">
      <Link to="/mainpage" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">MainPage</Link>
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <div className="p-5 h-screen bg-gray-100">
                            <h1 className="text-xl mb-2 font-serif text-left">User Information</h1>
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr className="bg-purple-300">
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Full Name</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Username</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Address</th>
                                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr
                        className="even:bg-purple-100 odd:bg-slate-50"
                        key={user.id}
                      >
                        <td className=" p-3 text-sm text-gray-700">
                          {user.full_name}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {user.email}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {user.username}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {user.address}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {user.phone}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-8/12 lg:ml-6 lg:w-3/12">
                            <UpdateUserForm />
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default User;
