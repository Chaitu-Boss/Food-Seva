import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllRoutes from './Routes';
import ChatAI from './components/ChatBot';

const App = () => {
  return (
    <Router >
      <div className="flex flex-col overflow-x-hidden">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content Area with Top Padding */}
        <div className="flex-1 overflow-auto pt-[64px]">  
          <AllRoutes />
        </div>

        {/* ChatBot */}
        <ChatAI />
      </div>
    </Router>
  )
}

export default App
