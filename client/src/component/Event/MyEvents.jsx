import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEventBusy, MdModeEditOutline } from "react-icons/md";
import { format } from "date-fns";
import Loader from "../Spinners/Loader";
import EditEventModal from "../Modals/EventModal/EditEventModal";
import DeleteEvent from "../Modals/EventModal/DeleteEvent";
import { Country, State, City } from 'country-state-city';

const formatDate = (dateString) => format(new Date(dateString), "dd-MM-yyyy");
const formatTime = (timeString) => format(new Date(timeString), "HH:mm");

const MyEvents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const { userEvents, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (error) toast.error("Failed to load events");
  }, [error]);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleNavigate = (eventId) => {
    navigate(`/event-details/${eventId}`, {
      state: { from: location.pathname },
    });
  };

  const getCountryName = (code) =>
    Country.getCountryByCode(code)?.name || code;

  const getStateName = (code, countryCode) =>
    State.getStatesOfCountry(countryCode)?.find((s) => s.isoCode === code)?.name || code;

  const getCityName = (name, stateCode, countryCode) =>
    City.getCitiesOfState(countryCode, stateCode)?.find((c) => c.name === name)?.name || name;

  const filteredEvents = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

    return userEvents?.filter((event) => {
      // Search (title, date, time, location)
      const hasPhysicalLocation = Array.isArray(event.location) && event.location.length >= 3;
      const locationText = hasPhysicalLocation
        ? `${event.location[2]}, ${event.location[1]}`.toLowerCase()
        : "";

      const matchesSearch =
        event.title.toLowerCase().includes(term) ||
        formatDate(event.startDate).includes(term) ||
        formatTime(event.startDate).includes(term) ||
        locationText.includes(term);

      // Category filter (assuming event.categories is an array/string)
      const matchesCategory =
        selectedCategory === "all" ||
        (Array.isArray(event.categories)
          ? event.categories.includes(selectedCategory)
          : event.categories === selectedCategory);

      // Date filter (compare YYYY-MM-DD part only)
      const matchesDate =
        !selectedDate || event.startDate.slice(0, 10) === selectedDate;

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [debouncedSearch, selectedCategory, selectedDate, userEvents]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading.userEvents) return <Loader loading={loading.userEvents} />;

  return (
    <section className="font-inter bg-orange-50 dark:bg-zinc-900 min-h-screen py-28 px-4 sm:px-6 md:px-10 lg:px-20">

      <div className="border-b border-gray-200 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row justify-between gap-4 my-6">
          {/* Search Bar */}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <IoIosCloseCircle
                size={20}
                onClick={clearSearch}
                className="absolute right-3 text-gray-500 dark:text-zinc-400 hover:text-orange-400 cursor-pointer transition"
              />
            )}
          </form>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto py-2.5 px-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-inner border border-gray-200 dark:border-zinc-700">
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
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-zinc-400 my-4">
        {filteredEvents.length === userEvents.length ? (
          <p>Showing all <span className="font-semibold">{userEvents.length}</span> event{userEvents.length > 1 ? 's' : ''}</p>
        ) : (
          <p>
            Showing <span className="font-semibold">{filteredEvents.length}</span> of{" "}
            <span className="font-semibold">{userEvents.length}</span> event{userEvents.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="overflow-x-auto bg-white dark:bg-zinc-800 shadow-md rounded-xl border border-gray-200 dark:border-zinc-700">
        <table className="min-w-[800px] w-full table-auto">
          <thead className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 text-sm">
            <tr>
              {[
                "Event",
                "Date",
                "Time",
                "Location",
                "Meet Link",
                "Capacity",
              ].map((title) => (
                <th
                  key={title}
                  className="px-5 py-4 text-left font-semibold whitespace-nowrap uppercase"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr
                  key={index}
                  className="border-t border-zinc-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
                  onClick={() => handleNavigate(event._id)}
                >
                  <td className="px-5 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        className="rounded-full w-10 h-10 object-cover shadow-sm"
                        src={event.image?.imageUrl}
                        alt="event"
                      />
                      <span className="font-medium text-gray-800 dark:text-zinc-100">
                         {event?.title?.length > 20
                          ? event?.title.slice(0, 20) + "..."
                          : event?.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-zinc-400">
                    {formatDate(event.startDate)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-zinc-400">
                    {event.startTime}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-zinc-400">
                     {getCityName(event.location[3], event.location[2], event.location[1])},{" "}
                      {getStateName(event.location[2], event.location[1])},{" "}
                      {getCountryName(event.location[1])}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <a
                      href={event.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Join Meeting
                    </a>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-zinc-400">
                    {event.limit}
                  </td>
                  {/* <td
                    className="px-5 py-4 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-3 items-center text-gray-500 dark:text-zinc-400">
                      <MdModeEditOutline
                        className="hover:text-orange-600 cursor-pointer"
                        size={20}
                        onClick={openEditModal}
                      />
                      <RiDeleteBin5Line
                        className="hover:text-red-600 cursor-pointer"
                        size={20}
                        onClick={openDeleteModal}
                      />
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <div className="flex flex-col items-center justify-center text-center px-8 py-12">
                    <MdEventBusy
                      size={80}
                      className="text-gray-300 dark:text-zinc-500 mb-4"
                    />
                    <p className="text-lg font-semibold text-gray-800 dark:text-zinc-100 mb-2">
                      No events match your search
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
                      Try adjusting your search or create a new event.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                      <Link to="/event-list">
                        <button className="px-5 py-2 bg-orange-600 text-white rounded-full text-sm hover:bg-orange-700 transition">
                          Explore events
                        </button>
                      </Link>
                      <Link to="/create-event">
                        <button className="px-5 py-2 bg-gray-700 dark:bg-zinc-700 text-white rounded-full text-sm hover:bg-gray-800 dark:hover:bg-zinc-800 transition">
                          Create event
                        </button>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {editModalOpen && <EditEventModal onClose={closeEditModal} />}
      {deleteModalOpen && <DeleteEvent onClose={closeDeleteModal} />}
    </section>
  );
};

export default MyEvents;
