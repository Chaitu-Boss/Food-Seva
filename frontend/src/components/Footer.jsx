import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#eeecdd] py-6 flex flex-col  text-center text-gray-700">
      <div className="flex justify-center space-x-50 text-sm m-4">
        <a href="#" className="hover:underline">
          Contact
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>

      <div className="flex justify-center space-x-6 text-lg mb-4">
        <a href="#" className="hover:text-gray-500">
          🐦
        </a>{" "}

        <a href="#" className="hover:text-gray-500">
          📘
        </a>{" "}

        <a href="#" className="hover:text-gray-500">
          📷
        </a>{" "}
      </div>

      <p className="text-sm">&copy; 2024 FoodShare</p>
    </footer>
  );
};

export default Footer;