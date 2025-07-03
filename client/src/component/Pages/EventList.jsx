import React, { useEffect, useState } from "react";
import EventTabs from "../Layout/EventTabs";
import EventCalendar from "./EventCalendar";
import "./EventCalendar.css";
import { IoIosSearch } from "react-icons/io";
import image from "./../../assets/event-image.png";
import img from "./../../assets/default-img.png";
import EventListView from "../Layout/EventListView";
import EventFlexView from "./EventFlexView";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const events = [
//   {
//     title: "Event",
//     description: "A party to have fun and connect",
//     organizer: "Rodiyat",
//     location: "Nigeria",
//     image: image,
//     startDate: "Mar 3, 2024",
//     endDate: "Mar 5, 2024",
//     startTime: "10 : 00 AM",
//     endTime: "15 : 30 PM",
//     attendees: [],
//     tickets: [],
//     limit: 5,
//     hasBooked: false,
//     reviews: [],
//     averageRating: 4,
//   },
//   {
//     title: "Event",
//     description: "A party to have fun and connect",
//     organizer: "Rodiyat",
//     location: "Nigeria",
//     image: image,
//     startDate: "Mar 3, 2024",
//     endDate: "Mar 5, 2024",
//     startTime: "10 : 00 AM",
//     endTime: "15 : 30 PM",
//     attendees: [],
//     tickets: [],
//     limit: 5,
//     hasBooked: false,
//     reviews: [],
//     averageRating: 4,
//   },
//   {
//     title: "Event",
//     description: "A party to have fun and connect",
//     organizer: "Rodiyat",
//     location: "Nigeria",
//     image: image,
//     startDate: "Mar 3, 2024",
//     endDate: "Mar 5, 2024",
//     startTime: "10 : 00 AM",
//     endTime: "15 : 30 PM",
//     attendees: [],
//     tickets: [],
//     limit: 5,
//     hasBooked: false,
//     reviews: [],
//     averageRating: 4,
//   },
// ];

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // AM/PM format
  });
};
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long", // Example: "Monday"
    year: "numeric", // Example: "2025"
    month: "long", // Example: "March"
    day: "numeric", // Example: "17"
  });
};

// const formatEventDate = (dateString) => {
//   const eventDate = new Date(dateString);
//   return format(eventDate, "MMMM d, yyyy"); // Example: "April 6, 2025"
// };


const EventList = () => {
  const [events, setEvents] = useState([]);
    // const { setSelectedEvent } = useEvent();
    // const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUpcomingEvent = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/event/upcoming-events`,
            {
              withCredentials: true,
            }
          );
          setEvents(response.data);
          console.log(events)
          // console.log(upcomingEvents._id)
          // console.log(response.data);
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };
      fetchUpcomingEvent();
    }, []);

  return (
    <section className="bg-orange-100 py-28 font-inter">
      <div className="flex justify-between px-10 gap-16">
        <div className="flex flex-col gap-6 w-1/3  items-center">
          <EventCalendar />
          <div className="bg-customGradient p-1 rounded-xl flex items-center w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full py-2 px-4 bg-orange-100 rounded-xl text-slate-500">
              <form className="flex gap-2 w-full">
                <button className="">
                  <IoIosSearch />
                </button>
                <input
                  type="text"
                  className="bg-transparent w-full outline-none"
                  placeholder="Search host"
                  name="search"
                />
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex gap-2 cursor-pointer hover:bg-orange-50 w-full rounded-lg py-2 px-4 border-gray-400 border"
              >
                <div className="w-[25px] h-[25px] overflow-hidden rounded-full bg-white">
                  <img
                    src={img}
                    alt="User image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p>{event.organizer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border-l border-gray-400">
          <EventListView />
        </div>
      </div>
      {/* <EventFlexView events={events}/> */}
    </section>
  );
};

export default EventList;
