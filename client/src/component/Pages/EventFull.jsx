import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLinkOutline, IoShareSocialOutline } from "react-icons/io5";
import AttendeeModal from "../Modal/AttendeeModal";
import image from "./../../assets/event-image.png";
import img from "./../../assets/default-img.png";
import { CiLocationOn } from "react-icons/ci";
import { VscBug } from "react-icons/vsc";
import {
  MdContentCopy,
  MdFeedback,
  MdModeEdit,
  MdOutlineCalendarMonth,
  MdOutlineEdit,
} from "react-icons/md";
import ShareModal from "../Modal/ShareModal";
import CopyToClipboard from "../Modal/CopyToClipboard";

import { IoLocationOutline, IoVideocamOutline } from "react-icons/io5";
import { MdEventBusy } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { toWords } from "number-to-words";
import EventList from "./EventList";

// import { useParams } from "react-router-dom";



const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const feedbacks = [
  // {
  //   name: "User",
  //   email: "user@gmail.com",
  //   img: img,
  //   comment:
  //     "The event is a very educative one, kudos to the host. The event is a very educative one, kudos to the host. The event is a very educative one, kudos to the host",
  //   rating: "",
  // },
];

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

const formatEventDate = (dateString) => {
  const eventDate = new Date(dateString);
  return format(eventDate, "MMMM d, yyyy"); // Example: "April 6, 2025"
};

const getDaysInWords = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const daysDiff = differenceInDays(eventDate, today);

  if (daysDiff === 0) return "today";
  if (daysDiff === 1) return "tomorrow";

  return `in ${toWords(daysDiff)} days`; // Example: "in nineteen days"
};

// const events = [
//   {title: 'party', description: 'Funnnnnnnn...', startDate: 'Mar3', startTime: '10:00AM'}
// ]

const EventFull = () => {
  // const { eventId } = useParams(); // ✅ Extract ID from URL
  // console.log({event})
  const [attendeeModalOpen, setAttendeeModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [events, setEvents] = useState(null);
  // console.log(events)

  const openAttendeeModal = () => {
    setAttendeeModalOpen(true);
  };

  const closeAttendeeModal = () => {
    setAttendeeModalOpen(false);
  };

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeASharModal = () => {
    setShareModalOpen(false);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        console.error("Error: Event ID is undefined.");
        return;
      }
      try {
        const response = await axios.get(
          `${SERVER_URL}/event/getEvent/${eventId}`,
          {
            withCredentials: true,
          }
        );
        setEvents(response.data);
        console.log(response);
        console.log(response.data);
        console.log({events})
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [events, setEvents]);

  return (
    <section className="bg-orange-100 py-28 font-inter">
           <div className="flex flex-col px-10 gap-8">
           <div className="flex flex-col gap-2 text-gray-700">
             <p className="font-semibold text-3xl">{events.title}</p>
             <div className="flex flex-col gap-1">
               <p>{events.description}</p>
               <p>
                 {/* {event.startDat
                   ? formatEventDate(event.startDate)
                   : "Date not available"}e */}
                   {events.startDat}
               </p>
             </div>
           </div>
 
           <div className="flex gap-6">
             <button
               onClick={openAttendeeModal}
               className="flex gap-3 border items-center border-orange-500 bg-orange-300 bg-opacity-50 px-10 rounded-lg py-4"
             >
               <FaRegUser size={20} />
               Check in Guest
             </button>
 
             <button
               onClick={openShareModal}
               className="flex gap-3 border items-center border-orange-500 bg-orange-300 bg-opacity-50 px-10 rounded-lg py-4"
             >
               <IoShareSocialOutline size={20} />
               Share event
             </button>
           </div>
 
           <div className="flex gap-6">
             <div className="bg-orange-300 bg-opacity-50 w-full border flex flex-col items-end justify-end border-orange-400 rounded-lg px-2 py-4">
               <button className="hover:bg-orange-300 cursor-pointer p-2 rounded-lg">
                 <MdOutlineEdit size={25} />
               </button>
               <img src={events?.image?.imageUrl} alt="" className="w-full h-[200px]" />
             </div>
 
             <div className="bg-orange-300 bg-opacity-50 w-full border border-orange-400 rounded-lg px-6 pt-6 pb-2">
               <div className="flex justify-between">
                 <p>EVENT RECAP</p>
                 <button className="hover:bg-orange-300 cursor-pointer p-2 rounded-lg">
                   <MdOutlineEdit size={20} />
                 </button>
               </div>
               <div>
                 <div className="flex gap-4 w-full text-gray-700 items-center">
                   <MdOutlineCalendarMonth size={30} />
                   <div className="flex flex-col gap-1 py-2 border-b w-full border-gray-700">
                     {/* <p>{event.startDate
                   ? formatEventDate(event.startDate)
                   : "Date not available"}</p>
                     <p>{event.startTime
                   ? formatEventDate(event.startTime)
                   : "Time not available"}</p> */}
                   {events.startDate}, {events.startTime}
                   </div>
                 </div>
 
                 <div className="flex gap-4 w-full text-gray-700 items-center">
                   <CiLocationOn size={30} />
                   <p className="py-4 border-b w-full border-gray-700">Ota</p>
                 </div>
 
                 <div className="flex gap-4 w-full text-gray-700 items-center">
                   <FaRegUser size={30} />
                   <p className="py-4 ">20 registrations</p>
                 </div>
               </div>
             </div>
 
             {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
               feedbacks.map((feedback, index) => (
                 <div
                   key={index}
                   className="bg-orange-300 bg-opacity-50 w-full border border-orange-400 rounded-lg px-6 pt-6 pb-2 flex flex-col gap-8"
                 >
                   <div className="flex flex-col gap-4">
                     <div className="flex gap-3 items-center">
                       <div className="w-[50px] h-[50px] overflow-hidden rounded-full bg-white">
                         <img
                           src={feedback.img}
                           alt="User image"
                           className="w-full h-full object-cover"
                         />
                       </div>
                       <div className="flex flex-col gap-0">
                         <p className="font-semibold text-lg">{feedback.name}</p>
                         <p className="text-gray-700">{feedback.email}</p>
                       </div>
                     </div>
                     <p className="text-sm font-normal">{feedback.comment}</p>
                   </div>
                   <div className=" flex items-center justify-center ">
                     <button className="py-3 px-10 bg-slate-500 text-white text-center hover:bg-slate-600 rounded-md text-sm max-w-[250px]">
                       View all feedbacks
                     </button>
                   </div>
                 </div>
               ))
             ) : (
               <div className="flex flex-col gap-6 items-center text-gray-700 bg-orange-300 bg-opacity-50 w-full border border-orange-400 rounded-lg px-6 pt-6 pb-2">
                 <MdFeedback size={75} className="" />
                 <div className="flex flex-col gap-2 items-center">
                   <p>No feedback yet</p>
                   <p className="px-4 text-center">
                     You do not have any feedback yet for this event
                   </p>
                 </div>
               </div>
             )}
           </div>
 
           <div className="flex justify-between w-full border items-center border-orange-500 bg-orange-300 bg-opacity-50 px-4 rounded-lg py-4">
             <div className="flex gap-4">
               <IoLinkOutline size={25} />
               <p>http://ticketeer.io/events</p>
             </div>
             <button>
               <CopyToClipboard />
             </button>
           </div>
 
           <div className="flex justify-between w-full border items-center border-orange-500 bg-orange-300 bg-opacity-50 px-4 rounded-lg py-4">
             <div className="flex gap-4 items-center">
               <VscBug size={25} />
               <div className="flex flex-col gap-1">
                 <p className="font-medium text-base">No collectible found</p>
                 <p className="font-normal text-sm">
                   You can attach NFTs & rewards for your guests to claim
                 </p>
               </div>
             </div>
             <button className="px-4 sm:px-10 py-2.5 bg-orange-400 text-white font-medium rounded-full text-sm transition-colors duration-500 hover:bg-orange-500">
               Add colletible
             </button>
           </div>
 
           <div className="flex justify-between w-full border items-center border-orange-500 bg-orange-300 bg-opacity-50 px-4 rounded-lg py-4">
             <div className="flex flex-col gap-3">
               <p className="font-medium text-sm">HOSTED BY</p>
               <div className="flex gap-2 items-center">
                 <div className="w-[20px] h-[20px] overflow-hidden rounded-full bg-white">
                   <img
                     src={img}
                     alt="User image"
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <p className="font-normal text-sm">User</p>
               </div>
             </div>
           </div>
         </div>
      {attendeeModalOpen && <AttendeeModal onClose={closeAttendeeModal} />}
      {shareModalOpen && <ShareModal onClose={closeASharModal} />}
    </section>
  );
};

export default EventFull;
