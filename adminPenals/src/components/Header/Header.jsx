import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-gray-900 ">
      <nav className="bg-gray-900 border-b border-gray-700 px-4 lg:px-6 py-4">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <div className="hidden lg:flex lg:items-center lg:w-auto lg:order-1 w-full" id="mobile-menu-2">
            <ul className="flex justify-evenly items-center w-full font-medium">
              <li className="mr-12">
                
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-20 pl-3 text-md font-semibold duration-200 ${
                      isActive ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-300"
                    } hover:text-blue-300`
                  }
                >
                  Add Invest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/viewsubscribe"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 text-md font-semibold duration-200 ${
                      isActive ?"text-pink-400 border-b-2 border-pink-400" : "text-gray-300"
                    } hover:text-blue-300`
                  }
                >
                  View all Subscribers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
