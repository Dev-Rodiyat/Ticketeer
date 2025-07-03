import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoVideocamOutline } from "react-icons/io5";
import { MdEventBusy } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":"); // Split "HH:mm" format
  const date = new Date();
  date.setHours(hours, minutes);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const FavouriteEvent = () => {
  const [favouriteEvents, setFavouriteEvents] = useState([]);

  useEffect(() => {
    const fetchFavouriteEvent = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/event/liked-events`, {
          withCredentials: true,
        });

        console.log(response.data);
        setFavouriteEvents(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchFavouriteEvent();
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-6 mt-6">
        {Array.isArray(favouriteEvents) && favouriteEvents.length > 0 ? (
          favouriteEvents.map((favourite, index) => (
            <div
              key={index}
              className="border-l-4 border-orange-500 py-4 px-6 flex flex-col gap-2 font-inter"
            >
              <p className="font-medium text-lg text-gray-700">
                {favourite.startDate
                  ? formatDate(favourite.startDate)
                  : "Date not available"}
              </p>
              <div className="flex items-center gap-2 px-6 py-4 bg-orange-300 bg-opacity-50 rounded-xl">
                <div className="flex justify-between w-full px-4 py-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-lg text-gray-700">
                        {formatTime(favourite.startTime)}
                      </p>
                      <p>{favourite.eventType}</p>
                      <p className="font-medium text-xl">{favourite.title}</p>
                    </div>
                    {/* <p>Funnnnnnnn</p> */}
                    <div className="flex gap-1 items-center">
                      <div className="w-[25px] h-[25px] overflow-hidden rounded-full bg-white">
                        <img
                          src={favourite.organizer.photo.imageUrl}
                          alt="User image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-normal text-sm">
                        Hosted by {favourite.organizer.name}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      {favourite.eventType === "virtual" ? (
                        <>
                          <IoVideocamOutline size={20} />
                          <a
                            href={favourite.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-normal text-sm text-blue-500 underline"
                          >
                            Join Meeting
                          </a>
                        </>
                      ) : (
                        <>
                          <IoLocationOutline size={25} />
                          <p className="font-normal text-sm">
                            {favourite.location?.venueName},{" "}
                            {favourite.location?.city},{" "}
                            {favourite.location?.country}
                          </p>
                        </>
                      )}
                    </div>
                    <Link to="/manage-event">
                      <button className="px-4 mt-4 sm:px-8 py-2 bg-slate-500 text-white font-medium rounded-lg text-sm transition-colors duration-500 hover:bg-slate-600">
                        view
                      </button>
                    </Link>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={favourite.image.imageUrl}
                      alt="Event image"
                      className=" object-cover w-[250px] h-[200px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border-l-4 border-orange-500 font-inter text-gray-700 text-center px-10">
            <div className="flex flex-col items-center gap-6 justify-center px-6 py-10 bg-orange-300 bg-opacity-50 rounded-xl">
              <MdEventBusy size={150} className="text-gray-500" />
              <div className="flex flex-col gap-2">
                <p className="font-medium text-xl">No favourite event!</p>
                <p className="font-medium text-sm">
                  You have no favourite events. Discover exciting events or
                  create one!
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <button className="px-4 sm:px-10 py-2.5 bg-orange-400 text-white font-medium rounded-full text-sm transition-colors duration-500 hover:bg-orange-500">
                  Explore events
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavouriteEvent;
