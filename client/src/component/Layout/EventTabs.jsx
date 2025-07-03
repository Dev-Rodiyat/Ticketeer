import React, { useState } from "react";
import PastEvent from "../Pages/PastEvent";
import FavouriteEvent from "../Pages/FavouriteEvent";
import UpcomingEvents from "../Pages/UpcomingEvents";

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="font-inter">
      {/* Tab Buttons */}
      <div className="flex justify-between w-full items-center">
        <p className="font-medium text-xl">Events</p>
        <div className="flex gap-2 border-black border rounded-full p-2">
          <div className="flex ">
            {["upcoming", "past", "favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium h-10 rounded-full transition-all duration-500 ease-in-out
      ${
        activeTab === tab
          ? "bg-orange-300 bg-opacity-50 text-black"
          : "bg-transparent text-gray-800"
      }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="">
        {activeTab === "upcoming" && <UpcomingEvents />}
        {activeTab === "past" && <PastEvent />}
        {activeTab === "favorites" && <FavouriteEvent />}
      </div>
    </div>
  );
};

// const UpcomingEvents = () => <p>Upcoming Events Content</p>;
// const PastEvent = () => <p>Past Events Content</p>;
// const FavoriteEvent = () => <p>Favorite Events Content</p>;

export default EventTabs;
