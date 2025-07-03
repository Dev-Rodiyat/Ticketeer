import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const Logout = ({onClose}) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/user/logout`,
        {},
        { withCredentials: true } 
      );
  
      if (response.status === 200) {
        // localStorage.removeItem("userToken");
        toast.success("Logout successful!");
        navigate("/login");
      } else {
        console.error("Logout failed",);
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("An error occurred while logging out.");
    }
  };
  
  return (
    
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 font-inter">
    <div className="flex flex-col items-center gap-8 px-8 py-16 rounded-lg shadow-lg relative w-1/3 bg-orange-300 text-center">
     <p className="font-semibold text-xl">Are you sure you want to log out of your account?</p>
     <div className="flex gap-4">
      <button className="bg-slate-500 py-2 px-6 sm:px-10 text-base text-white rounded-md hover:bg-slate-600 transition-colors w-full md:w-auto md:max-w-[200px]" onClick={logoutUser}>Yes</button>
      <button className="bg-slate-500 py-2 px-6 sm:px-10 text-base text-white rounded-md hover:bg-slate-600 transition-colors w-full md:w-auto md:max-w-[200px]" onClick={onClose}>No</button>
     </div>
    </div>
  </div>
  )
}

export default Logout