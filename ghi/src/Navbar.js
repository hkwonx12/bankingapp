import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";


function Nav() {
    const { logout } = useToken();
    const navigate = useNavigate()

    function myLogout() {
        logout();
        navigate("/");
    }

  return (

    <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
    <img src="\public\croissant-svgrepo-com.svg" alt="Croissant" className="h-8 w-8 mr-2" />
    <span className="font-semibold text-xl tracking-tight">Croissant United Bank</span>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-purple-200 border-purple-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="ghi\public\croissant-svgrepo-com.svg"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
        Checking
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
        Savings
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white">
        Investment
      </a>
    </div>
    <div className="flex gap-2">
    <div>
      <NavLink to="/login" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Login</NavLink>
    </div>

    <div>
      <NavLink to="/signup" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign Up</NavLink>
    </div>
    </div>
  </div>
</nav>
  )
}

export default Nav;
