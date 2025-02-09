// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import dalle from '../assets/Navbar/dalle.png'

// const Navbar = () => {
//   return (
//     <div className='fixed top-0 left-0 right-0 bg-neutral-600 shadow-md z-50'>
//       <div className='container mx-auto flex justify-between items-center  px-4'>
//         <div className='flex items-center'>
//           <img className='pl-5' src={dalle} alt="Logo" height={55} width={100} />
//         </div>
//         <div className='flex items-center space-x-10 text-black text-lg'>
//           <NavLink to="/" className="font-barlow font-bold text-lg text-white leading-custom  cursor-pointer">
//             <p>Home</p>
//           </NavLink>
//           <NavLink to="/about" className="font-barlow font-bold text-lg text-white leading-custom  cursor-pointer ">
//             <p>About Us</p>
//           </NavLink>
//           <NavLink to="/contact" className="font-barlow font-bold text-lg text-white leading-custom  cursor-pointer">
//             <p>Contact Us</p>
//           </NavLink>
//           <NavLink to="/login" className="font-barlow font-bold text-lg text-white leading-custom  cursor-pointer">
//             <p>Login</p>
//           </NavLink>
//           <NavLink to="/Donor-upload-Food-Form" className="bg-neutral-600 font-bold rounded-br-[32px] text-white rounded-tl-[32px] hover:rounded-tr-[32px] hover:rounded-bl-[32px]">
//             <span className='bg-amber-500 py-2 px-4 rounded-[8px] font-barlow'>
//               Donate Now <span role="img" aria-label="heart">🧡</span>
//             </span>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import dalle from '../assets/Navbar/dalle.png';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const isLoggedIn = !!user;
  const isDonor = user?.role === "donor";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-gray-700 shadow-md z-50'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        
        {/* Logo */}
        <div className='flex items-center'>
          <img className='pl-5' src={dalle} alt="Logo" height={55} width={100} />
        </div>

        {/* Navigation Links */}
        <div className='flex items-center space-x-10 text-black text-lg'>
          <NavLink to="/" className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
            <p>Home</p>
          </NavLink>
          <NavLink to="/about" className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
            <p>About Us</p>
          </NavLink>
          <NavLink to="/contact" className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
            <p>Contact Us</p>
          </NavLink>

          {/* Show Dashboard if logged in */}
          {isLoggedIn && (
            <NavLink to="/dashboard" className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
              <p>Dashboard</p>
            </NavLink>
          )}

          {/* Show Login or Logout */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
              <p>Logout</p>
            </button>
          ) : (
            <NavLink to="/login" className="font-barlow font-bold text-lg text-white leading-custom cursor-pointer">
              <p>Login</p>
            </NavLink>
          )}

          {/* Show Donate Now button only if user is a donor */}
          {isDonor && (
            <NavLink to="/Donor-upload-Food-Form" className="bg-neutral-600 font-bold rounded-br-[32px] text-white rounded-tl-[32px] hover:rounded-tr-[32px] hover:rounded-bl-[32px]">
              <span className='bg-amber-500 py-2 px-4 rounded-[8px] font-barlow'>
                Donate Now <span role="img" aria-label="heart">🧡</span>
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
