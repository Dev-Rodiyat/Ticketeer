import React, { useState } from "react";
import EventFlexView from "../Pages/EventFlexView";
import EventGridView from "../Pages/EventGridView";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";

const EventListView = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="font-inter">
      <div className=" border-gray-400 border-b px-4">
        <div className="bg-customGradient p-1 rounded-xl flex items-center w-full mb-5">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full py-3 px-4 bg-orange-100 rounded-xl text-slate-500">
            <form className="flex gap-2 w-full">
              <button className="">
                <IoIosSearch />
              </button>
              <input
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="Search by event name, location, date, or category"
                name="search"
              />
            </form>
          </div>
        </div>
      </div>
      {/* Tab Buttons */}
      <div className="flex justify-between w-full items-center border-b border-gray-400 p-4">
        <div className="flex justify-between gap-8 items-center">
          <IoIosArrowBack size={20} />
          <p className="font-medium text-xl">March</p>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex gap-2 border-black border rounded-full p-2">
          <div className="flex ">
            {["list", "grid"].map((tab) => (
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
        {activeTab === "list" && <EventFlexView />}
        {activeTab === "grid" && <EventGridView />}
      </div>
    </div>
  );
};

export default EventListView;
