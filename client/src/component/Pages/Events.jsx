import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MdEventBusy } from "react-icons/md";
import axios from "axios";

// Category Images
import business from "./../../assets/Business.png";
import music from "./../../assets/Music.png";
import conference from "./../../assets/Conference.png";
import nightlife from "./../../assets/Nightlife.png";
import sports from "./../../assets/Sports.png";
import arts from "./../../assets/Arts.png";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const categories = [
  {
    title: "Business and networking",
    description:
      "An event for learned individuals to come together and network",
    image: business,
  },
  {
    title: "Music and concert",
    description:
      "Find live concerts, festivals, and intimate gigs for every genre.",
    image: music,
  },
  {
    title: "Arts and culture",
    description:
      "Celebrate creativity with exhibitions, performances, and cultural events.",
    image: arts,
  },
  {
    title: "Sports and fitness",
    description:
      "Catch live matches, marathons, and sports tournaments near you",
    image: sports,
  },
  {
    title: "Festival and fairs",
    description: "Enjoy exhibitions, performances, and cultural fairs.",
    image: conference,
  },
  {
    title: "Fun and hangout",
    description: "Fun-filled events for kids, parents, and the whole family.",
    image: nightlife,
  },
];

// Format Date & Time
const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short", // Abbreviated month (e.g., "Mar")
    day: "numeric", // Numeric day (e.g., "31")
  });

const Events = () => {
  const upcomingRef = useRef(null);
  const trendingRef = useRef(null);
  const categoryRef = useRef(null);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [scrollState, setScrollState] = useState({
    upcoming: { left: false, right: false },
    trending: { left: false, right: false },
    category: { left: false, right: false },
  });

  // Scroll Function
  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = 300;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(() => updateScrollState(ref), 300);
  };

  // Update Scroll State
  const updateScrollState = (ref, type) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setScrollState((prev) => ({
      ...prev,
      [type]: {
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth,
      },
    }));
  };

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, trendingRes] = await Promise.all([
          axios.get(`${SERVER_URL}/event/upcoming-events`, {
            withCredentials: true,
          }),
          axios.get(`${SERVER_URL}/event/getEvents`, { withCredentials: true }),
        ]);
        setUpcomingEvents(upcomingRes.data || []);
        setTrendingEvents(trendingRes.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    updateScrollState(upcomingRef, "upcoming");
    updateScrollState(trendingRef, "trending");
    updateScrollState(categoryRef, "category");
    window.addEventListener("resize", () => {
      updateScrollState(upcomingRef, "upcoming");
      updateScrollState(trendingRef, "trending");
      updateScrollState(categoryRef, "category");
    });
    return () =>
      window.removeEventListener("resize", () => {
        updateScrollState(upcomingRef, "upcoming");
        updateScrollState(trendingRef, "trending");
        updateScrollState(categoryRef, "category");
      });
  }, []);

  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setFilteredEvents(upcomingEvents); // Initialize with all events
  }, [upcomingEvents]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);

    if (!term) {
      setFilteredEvents(upcomingEvents); // Reset if search is empty
      return;
    }

    const filtered = upcomingEvents.filter((event) => {
      return (
        event?.title?.toLowerCase().includes(term) ||
        event?.category?.toLowerCase().includes(term) ||
        (event?.startDate &&
          new Date(event.startDate)
            .toLocaleDateString("en-US", { month: "short", day: "numeric" })
            .toLowerCase()
            .includes(term))
      );
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="bg-orange-50 flex flex-col gap-10 lg:pt-32 pb-20 items-center">
      {/* Search Bar */}
      <div className="w-full flex justify-center">
        <div className="bg-customGradient p-1 rounded-xl w-full sm:w-9/12">
          <div className="bg-orange-100 rounded-xl text-slate-500 p-3">
            <form className="flex gap-2 w-full">
              <button>
                <IoIosSearch />
              </button>
              <input
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="Search by event title, date or category"
                onChange={handleSearchChange}
                value={search}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Event Sections */}
      {[
        {
          title: "Upcoming events",
          events: filteredEvents,
          ref: upcomingRef,
          type: "upcoming",
        },
        {
          title: "Trending events",
          events: trendingEvents,
          ref: trendingRef,
          type: "trending",
        },
        {
          title: "Categories",
          events: categories,
          ref: categoryRef,
          type: "category",
        },
      ].map(({ title, events, ref, type }, idx) => (
        <div key={idx} className="relative w-full pl-5 space-y-2">
          <p className="font-inter lg:text-2xl md:text-xl text-xl pl-4 font-semibold">
            {title}
          </p>
          {scrollState[type].left && (
            <button
              onClick={() => scroll(ref, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div
            ref={ref}
            className="flex gap-6 py-5 overflow-hidden scroll-smooth snap-x snap-mandatory w-full px-10 select-none"
          >
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={event._id || index}
                  className="flex-shrink-0 w-[250px] snap-start bg-slate-400 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={event.image?.imageUrl || event.image}
                    alt=""
                    className="w-full h-auto rounded-t-2xl"
                  />
                  <div className="text-white flex flex-col gap-1 p-4">
                    <p className="font-lora font-semibold text-lg">
                      {event.title}
                    </p>
                    <p className="font-inter text-sm">
                      {event.startDate
                        ? formatDate(event.startDate)
                        : event.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-4 py-10 text-gray-700">
                <MdEventBusy size={60} className="text-orange-500" />
                <div className="items-center flex gap-1 flex-col">
                  <p className="font-medium text-xl">
                    No {title.toLowerCase()} available!
                  </p>
                  <p className="font-normal text-base">
                    <Link to="/login">
                      <span className="hover:border-b-2 border-orange-500 text-orange-500">
                        Log in
                      </span>
                    </Link>{" "}
                    to create events of your choice!
                  </p>
                </div>
              </div>
            )}
          </div>
          {scrollState[type].right && (
            <button
              onClick={() => scroll(ref, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-800 z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Events;
