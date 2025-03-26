import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import dalle from '../assets/Navbar/dalle.png';

const Navbar = () => {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const isLoggedIn = !!user;
  const isDonor = user?.role === "donor";

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div className='fixed top-0 left-0 right-0 bg-[#eeecdd] z-50'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        
        {/* Logo */}
        <div className='flex items-center'>
          <img className='pl-5' src={dalle} alt="Logo" height={55} width={100} />
        </div>

        <div className='flex items-center pr-10 space-x-10 text-black text-lg'>
          <NavLink to="/" className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
            <p>Home</p>
          </NavLink>
          <NavLink to="/about" className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
            <p>About Us</p>
          </NavLink>
          <NavLink to="/contact" className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
            <p>Contact Us</p>
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/dashboard" className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
              <p>Dashboard</p>
            </NavLink>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
              <p>Logout</p>
            </button>
          ) : (
            <NavLink to="/login" className="font-barlow font-normal text-lg text-black leading-custom cursor-pointer">
              <p>Login</p>
            </NavLink>
          )}

          {isDonor && (
            <NavLink to="/Donor-upload-Food-Form" className="bg-neutral-600 font-medium text-white ">
              <span className='bg-[#13333E] py-2 px-4 font-barlow rounded-br-xl rounded-tl-xl hover:rounded-tr-xl hover:rounded-bl-xl'>
                Donate Now <span role="img" aria-label="heart"></span>
              </span>
            </NavLink>
          )}

          { !isDonor && isLoggedIn && (
            <NavLink to="/ngo-request" className="text-white">
              <span className='bg-[#13333E] py-2 px-4 font-barlow font-medium rounded-br-xl rounded-tl-xl hover:rounded-tr-xl hover:rounded-bl-xl'>
                Request Food <span role="img" aria-label="heart"></span>
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;