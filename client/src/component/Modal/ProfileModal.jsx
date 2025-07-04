import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import img from "./../../assets/default-img.png";
import { IoClose } from "react-icons/io5";
import { TbTicket } from "react-icons/tb";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const profileLink = [
  { link: "Tickets", route: '/dashboard' },
  { link: "Edit Profile", route: '/settings/update' },
  { link: "Settings", route: '/settings' },
  { link: "Log out", route: '/settings' },
];

const iconMap = {
  "Edit Profile": FaUser,
  Settings: FaCog,
  Tickets: TbTicket,
  'Log out': FaSignOutAlt,
};

const ProfileModal = ({ onClose, isOpen }) => {
    const [name, setName] = useState("user");
    const [email, setEmail] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/user/get-user`, {
            withCredentials: true,
          });
          setName(response.data.name);
          setEmail(response.data.email);
          setProfilePhoto(response.data.photo.imageUrl);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchUser();
    }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-end items-start z-50 font-inter">
      <div className="flex flex-col gap-6 py-4 px-5 rounded-lg shadow-lg bg-orange-300 text-center w-[90%] max-w-[350px] mt-5 mr-5 self-start max-h-[80vh]">
        {/* Close Button - Positioned in the top-right corner */}
        <button className="absolute top-6 right-6 hover:bg-orange-100 cursor-pointer p-2 rounded-lg">
          <IoClose size={25} onClick={onClose} />
        </button>

        {/* User Image & Info */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-[100px] h-[100px] overflow-hidden rounded-full bg-white">
            <img
              src={profilePhoto}
              alt="User image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium text-lg">{name}</p>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        {/* Profile Links */}
        <div className="flex flex-col items-center gap-2 w-full">
          {profileLink?.map(({ link, route }, index) => {
            const IconComponent = iconMap[link] || FaUser; // Default icon if no match
            return (
              <Link to={route} className="w-full" onClick={onClose}>
              <div
                key={index}
                className="flex justify-between items-center bg-orange-50 hover:bg-orange-100 transition-colors duration-700 ease-in-out cursor-pointer w-full gap-5 p-4 rounded-md shadow-md"
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={20} className="text-gray-600" />{" "}
                  {/* Icon */}
                  <p className="text-gray-800">{link}</p>
                </div>
                <button className="text-gray-600 hover:text-gray-900">
                  <IoIosArrowForward size={20} />
                </button>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
