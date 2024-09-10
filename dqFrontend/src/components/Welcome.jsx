import React from "react";
import { Link } from "react-router-dom";
import dqLogo from '../assets/dqLogo.png';
const Welcome = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }} // Replace with your image path
    >
      <div className="bg-opacity-50 bg-black w-full h-full absolute top-0 left-0 z-0"></div>
      
      {/* Logo */}
      <div className="relative z-10">
        <img
          src={dqLogo} // Replace with your logo path
          alt="Logo"
          className="w-48 h-48 mb-4 rounded-xl shadow-lg "
        />
      </div>

      {/* Welcome Message */}
      <h1 className="relative z-10 text-white text-4xl font-bold mb-4">
        Welcome to Adro DQ
      </h1>

      {/* Login Button */}
      <Link to="/login" className="relative z-10">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
          Click to Login
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
