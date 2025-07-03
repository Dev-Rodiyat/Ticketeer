import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import EventTabs from "../Layout/EventTabs";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Dashboard = () => {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [event, setEvent] = useState([]);

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

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/event/getUserEvents`, {
          withCredentials: true,
        });

        // Ensure response data is always an array
        const events =
          response?.data && Array.isArray(response.data) ? response.data : [];

        setEvent(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvent([]); // Ensure `setEvent` is always called to avoid UI issues
      }
    };

    fetchUser();
    fetchEvent();
  }, []);

  return (
    <section className="bg-orange-100 py-28 font-inter">
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-12 lg:px-16 gap-12 w-full">
        {/* Profile Card */}
        <div className="flex flex-col gap-6 w-80 md:w-96 items-center">
          <div className="relative flex flex-col w-full h-[200px] gap-5 py-6 px-4 bg-orange-300 bg-opacity-50 rounded-xl shadow-md">
            {/* Edit Button */}
            <Link to="/settings/update">
              <button className="absolute top-4 right-4 hover:bg-orange-100 transition p-2 rounded-lg">
                <MdModeEdit size={22} />
              </button>
            </Link>

            {/* Profile Details */}
            <div className="flex flex-col gap-4 items-center">
              <div className="w-14 h-14 overflow-hidden rounded-full ">
                <img
                  src={profilePhoto}
                  alt="User image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 text-center">
                {/* <p className="font-medium text-lg md:text-xl">user</p>
            <p className="text-xs md:text-sm text-gray-700">user@gmail.com</p> */}
                <p className="font-medium text-lg md:text-lg">{name}</p>
                <p className="text-xs md:text-sm text-gray-700">{email}</p>
              </div>
            </div>
          </div>

          {/* Create Event Button */}
          <Link to="/create-event">
            <button className="px-6 sm:px-12 md:px-16 py-3 w-full bg-orange-400 text-white font-semibold rounded-full text-sm md:text-base transition hover:bg-orange-500">
              Create event
            </button>
          </Link>

          {/* Stats Section */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col gap-2 py-5 px-4 w-full h-[100px] items-center bg-orange-300 shadow-md bg-opacity-50 rounded-xl">
              <p className="font-semibold text-lg md:text-xl">{event.length}</p>
              <p className="text-sm md:text-base font-medium">Events Created</p>
            </div>
            <div className="flex flex-col gap-2 py-5 px-4 w-full h-[100px] items-center bg-orange-300 shadow-md bg-opacity-50 rounded-xl">
              <p className="font-semibold text-lg md:text-xl">0</p>
              <p className="text-sm md:text-base font-medium">
                Tickets Purchased
              </p>
            </div>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="w-full">
          <EventTabs />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
