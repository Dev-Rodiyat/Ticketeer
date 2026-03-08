import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import EventGrid from "../EventDisplay/EventGrid";
import EventList from "../EventDisplay/EventList";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingEvents } from "../../../redux/reducers/eventSlice";
import { motion } from "framer-motion";
import Loader from "../../Spinners/Loader";
import { FaList, FaThLarge } from "react-icons/fa";

const viewTabs = [
  { key: "list", icon: <FaList size={18} /> },
  { key: "grid", icon: <FaThLarge size={18} /> },
];

const EventListView = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const { upcomingEvents, loading } = useSelector((state) => state.events);
  console.log(upcomingEvents);

  useEffect(() => {
    dispatch(getUpcomingEvents()); // Fetch upcoming events on component mount
  }, [dispatch]);

  // if (loading.upcomingEvents) {
  //   return <Loader loading={loading.upcomingEvents} />;
  // }

  const filteredEvents = upcomingEvents.filter((event) => {
    const query = searchQuery.toLowerCase();

    // Text search (same as before)
    const matchesSearch =
      event?.title?.toLowerCase().includes(query) ||
      (Array.isArray(event?.categories)
        ? event?.categories.join(" ").toLowerCase().includes(query)
        : event?.categories?.toLowerCase().includes(query)) ||
      event?.location?.join(" ")?.toLowerCase().includes(query) ||
      event?.startDate?.toLowerCase().includes(query);

    // Category filter
    const matchesCategory =
      selectedCategory === "all" ||
      (Array.isArray(event?.categories)
        ? event?.categories.includes(selectedCategory)
        : event?.categories === selectedCategory);

    // Date filter (check only YYYY-MM-DD part)
    const matchesDate =
      !selectedDate ||
      event?.startDate?.slice(0, 10) === selectedDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="font-inter w-full">

      <div className="border-b border-gray-200 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full md:w-1/2 flex items-center py-2.5 px-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-inner border border-gray-200 dark:border-zinc-700"
          >
            <IoIosSearch
              size={22}
              className="text-gray-500 dark:text-zinc-400 absolute left-3"
            />
            <input
              type="text"
              className="pl-10 pr-9 py-2 w-full bg-transparent outline-none text-sm text-gray-700 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500"
              placeholder="Search by event name, location, date, or category"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IoIosCloseCircle
                size={20}
                onClick={clearSearch}
                className="absolute right-3 text-gray-500 dark:text-zinc-400 hover:text-orange-400 cursor-pointer transition"
              />
            )}
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto py-1 px-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-inner border border-gray-200 dark:border-zinc-700">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="business and networking">Business and Networking</option>
              <option value="music and concert">Music and Concert</option>
              <option value="sport and fitness">Sport and Fitness</option>
              <option value="arts and culture">Arts and Culture</option>
              <option value="festival and fairs">Festival and Fairs</option>
              <option value="fun and hangout">Fun and Hangout</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-900 dark:text-zinc-100 cursor-pointer"
            />

            {(selectedCategory !== "all" || selectedDate) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDate("");
                }}
                className="px-3 py-2 text-sm font-medium rounded-lg text-orange-500 border border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition"
              >
                Reset
              </button>
            )}
            <div className="flex justify-end w-full">
              <div className="flex gap-2 bg-gray-100 dark:bg-zinc-700 rounded-2xl p-2 shadow-inner">
                {viewTabs.map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center
                      ${activeTab === tab.key
                        ? "bg-orange-400 text-white shadow-md"
                        : "text-gray-600 dark:text-zinc-300 hover:bg-orange-100 dark:hover:bg-orange-200/10"
                      }`}
                  >
                    {tab.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-zinc-400 my-2">
        {filteredEvents.length === upcomingEvents.length ? (
          <p>
            Showing all{" "}
            <span className="font-semibold">{upcomingEvents.length}</span>{" "}
            event {upcomingEvents.length > 1 ? 's' : ''}
          </p>
        ) : (
          <p>
            Showing{" "}
            <span className="font-semibold">{filteredEvents.length}</span> of{" "}
            <span className="font-semibold">{upcomingEvents.length}</span>{" "}
            event{upcomingEvents.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div>
        {activeTab === "list" && <EventList events={filteredEvents} />}
        {activeTab === "grid" && <EventGrid events={filteredEvents} />}
      </div>
    </div>
  );
};

export default EventListView;
