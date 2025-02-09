import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import ContactUs from './pages/ContactUs.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DonateForm from './pages/DonateForm.jsx';
import Dashboard from './pages/Dashboard.jsx'

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Donor-upload-Food-Form" element={<DonateForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default AllRoutes
