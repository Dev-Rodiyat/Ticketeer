import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoVideocamOutline } from "react-icons/io5";
import { MdEventBusy } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Spinners/Loader";
import { toast } from "react-toastify";
import { IoIosSearch, IoIosCloseCircle } from "react-icons/io";
import EventView from "../Event/EventView";
import { Country, State, City } from "country-state-city";

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MyTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.user);
  const { userTickets, loading, error } = useSelector((state) => state.events);

  const [searchQuery, setSearchQuery] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong fetching tickets");
    }
  }, [error]);

  if (loading.userTickets) {
    return <Loader loading={loading.userTickets} />;
  }

  const handleNavigate = (ticketId) => {
    navigate(`/ticket-page/${ticketId}`, {
      state: { from: location.pathname },
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPurchaseDate("");
    setTicketType("");
    setCategory("");
  };

  const uniqueTicketTypes = Array.from(
    new Set(userTickets.map((ticket) => ticket?.ticketTypeId?.type).filter(Boolean))
  );

  const filteredTickets = userTickets.filter((ticket) => {
    const event = ticket?.eventId;

    const matchesSearch = !searchQuery || (event?.title?.toLowerCase()?.includes(searchQuery.toLowerCase().trim()) ?? false);

    const matchesPurchaseDate = purchaseDate
      ? new Date(ticket?.purchaseDate).toDateString() ===
      new Date(purchaseDate).toDateString()
      : true;

    const matchesTicketType = ticketType
      ? ticket?.ticketTypeId?.type?.toLowerCase() === ticketType.toLowerCase()
      : true;

    const matchesCategory = category
      ? (event?.categories ?? event?.category)?.toLowerCase()?.trim() === category.toLowerCase().trim()
      : true;

    return (
      matchesSearch && matchesPurchaseDate && matchesTicketType && matchesCategory
    );
  });

  console.log(filteredTickets);

  const getCountryName = (code) =>
    Country.getCountryByCode(code)?.name || code;

  const getStateName = (code, countryCode) =>
    State.getStatesOfCountry(countryCode)?.find((s) => s.isoCode === code)?.name || code;

  const getCityName = (name, stateCode, countryCode) =>
    City.getCitiesOfState(countryCode, stateCode)?.find((c) => c.name === name)?.name || name;

  const isAnyFilterActive =
    searchQuery || purchaseDate || ticketType || category;

  return (
    <section className="mt-6 py-20 px-4 md:px-16 lg:px-20 bg-orange-100 dark:bg-zinc-900 min-h-screen font-inter">
      <div className="flex flex-col gap-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 dark:border-zinc-700 pb-4">

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IoIosCloseCircle
                size={20}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-500 dark:text-zinc-400 hover:text-orange-400 cursor-pointer transition"
              />
            )}
          </form>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto py-2.5 px-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-inner border border-gray-200 dark:border-zinc-700">
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="px-3 py-2 text-sm min-w-[150px] rounded-lg border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 cursor-pointer"
            />

            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="px-3 py-2 text-sm min-w-[150px] rounded-lg border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 cursor-pointer"
            >
              <option value="">All Ticket Types</option>
              {uniqueTicketTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 text-sm min-w-[150px] rounded-lg border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="business and networking">Business and Networking</option>
              <option value="music and concert">Music and Concert</option>
              <option value="sport and fitness">Sport and Fitness</option>
              <option value="arts and culture">Arts and Culture</option>
              <option value="festival and fairs">Festival and Fairs</option>
              <option value="fun and hangout">Fun and Hangout</option>
            </select>

            {isAnyFilterActive && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-zinc-400">
          {filteredTickets.length === userTickets.length ? (
            <p>Showing all <span className="font-semibold">{userTickets.length}</span> ticket{userTickets.length > 1 ? 's' : ''}</p>
          ) : (
            <p>
              Showing <span className="font-semibold">{filteredTickets.length}</span> of{" "}
              <span className="font-semibold">{userTickets.length}</span> ticket{userTickets.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {filteredTickets.map((ticket, index) => (
              <div
                key={index}
                className="border-l-4 border-orange-500 bg-white dark:bg-zinc-800 shadow-lg rounded-2xl p-6 sm:p-8 transition duration-300 hover:shadow-xl"
              >
                <p className="text-sm font-semibold text-orange-600 mb-2">
                  {formatDate(ticket?.eventId?.startDate) || "Date not available"}
                </p>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-orange-50 dark:bg-zinc-700 bg-opacity-50 rounded-xl p-4">

                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
                        {formatTime(ticket?.eventId?.startTime)}
                      </p>
                      <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                        {ticket?.eventId?.title?.length > 15
                          ? ticket?.eventId?.title.slice(0, 15) + "..."
                          : ticket?.eventId?.title}
                      </p>
                    </div>

                    <div className="hidden">
                      <EventView ticket={ticket?._id} />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden shadow">
                        <img
                          src={
                            ticket?.eventId?.organizer?.photo?.imageUrl ||
                            ticket?.eventId?.organizer?.photo ||
                            "/default-avatar.png"
                          }
                          alt="Organizer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-200">
                        Hosted by{" "}
                        <span className="font-medium">
                          {ticket?.eventId?.organizer.name}
                        </span>{" "}
                        {user?._id === ticket?.eventId?.organizer?._id && "(you)"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {ticket?.eventId?.meetLink && (
                        <div className="flex gap-2">
                          <IoVideocamOutline className="text-lg" size={24} />
                          <a
                            href={ticket?.eventId?.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                      {ticket?.eventId?.location && (
                        <div className="flex gap-2">
                          <IoLocationOutline className="text-lg" size={24} />
                          {getCityName(
                            ticket?.eventId?.location[3],
                            ticket?.eventId?.location[2],
                            ticket?.eventId?.location[1]
                          )},{" "}
                          {getStateName(
                            ticket?.eventId?.location[2],
                            ticket?.eventId?.location[1]
                          )},{" "}
                          {getCountryName(ticket?.eventId?.location[1])}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleNavigate(ticket?._id)}
                      className="mt-3 w-fit px-6 py-2 rounded-full bg-zinc-700 dark:bg-orange-500 dark:hover:bg-orange-600 hover:bg-zinc-800 text-white text-sm font-medium transition"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Image */}
                  <div className="w-full md:w-[240px] h-[200px] md:h-[180px] rounded-xl overflow-hidden shadow-md">
                    <img
                      src={ticket?.eventId?.image?.imageUrl || "/default-image.png"}
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-l-4 border-orange-500 font-inter text-gray-700 dark:text-zinc-200 text-center px-4 sm:px-10">
            <div className="flex flex-col items-center gap-6 justify-center px-6 py-10 bg-orange-100 dark:bg-zinc-800 bg-opacity-60 rounded-xl shadow-sm">
              <MdEventBusy
                size={120}
                className="text-gray-400 dark:text-zinc-500"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-xl text-zinc-700 dark:text-zinc-100">
                  No tickets found
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Try adjusting your filters or search query.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Link to="/event-list">
                  <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full text-sm transition">
                    Explore Events
                  </button>
                </Link>
                <Link to="/create-event">
                  <button className="px-6 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-md text-sm transition">
                    Create Event
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTickets;
