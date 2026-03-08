import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FaCalendarTimes, FaCube, FaMobileAlt, FaShareAlt } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiSolidPurchaseTag } from "react-icons/bi";

import hero from "./../../assets/Hero-Bg.png";
import business from "./../../assets/Business.png";
import music from "./../../assets/Music.png";
import arts from "./../../assets/Arts.png";
import SplashScreen from "../Spinners/SplashScreen";
import {
  MdAnalytics,
  MdOutlineDashboardCustomize,
  MdOutlineExplore,
  MdOutlineMailOutline,
} from "react-icons/md";
import { SiStripe } from "react-icons/si";
import {
  FaCalendarCheck,
  FaBullhorn,
  FaUsersCog,
  FaCheckCircle,
} from "react-icons/fa";

const cards = [
  {
    text: "Business and networking",
    about:
      "Learn, connect, and grow at professional conferences and networking events.",
    image: business,
  },
  {
    text: "Music",
    about: "Find live concerts, festivals, and intimate gigs for every genre.",
    image: music,
  },
  {
    text: "Arts and culture",
    about:
      "Celebrate creativity with exhibitions, performances, and cultural events.",
    image: arts,
  },
];

const howItWorks = [
  {
    icon: <FaCalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Set Up Your Event",
    description: "Enter key details like event name, date, time, and venue.",
  },
  {
    icon: <FaBullhorn className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Publish & Promote",
    description:
      "Go live and share your event through social media, email, and marketing tools.",
  },
  {
    icon: <FaUsersCog className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Sell & Manage Attendees",
    description:
      "Track ticket sales, manage guest lists, and access event analytics in real-time.",
  },
  {
    icon: <BiSolidPurchaseTag className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Ticket Purchase",
    description:
      "Purchase ticket to events of your choice and get notified about all that goes on",
  },
  {
    icon: <FaShareAlt className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Share Event",
    description:
      "Share events on your social media handles and make them go live and popular",
  },
  {
    icon: <FaCalendarTimes className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
    title: "Cancel and Resume Event",
    description:
      "Cancel and resume events if needed and both organizers and attendees get real time notification about it",
  },
];

const choice = [
  {
    strong: "Easy Event Setup",
    normal: "Create and launch your event in minutes.",
  },
  {
    strong: "Flexible Ticketing",
    normal: "Create ticket tiers with custom pricing and bundle options.",
  },
  {
    strong: "Secure Transactions",
    normal: "Ensure safe and smooth ticket purchases for attendees.",
  },
  {
    strong: "Powerful Analytics",
    normal: "Monitor sales, attendance, and engagement with real-time data.",
  },
  // {
  //   strong: "24/7 Support",
  //   normal: "Get help anytime from our dedicated support team.",
  // },
];

const faq = [
  {
    question: "What types of events can I host on Ticketeer?",
    answer:
      "Ticketeer supports a wide range of events — from concerts, festivals, and sports matches to workshops, conferences, webinars, and more.",
  },
  {
    question: "How do I purchase tickets for an event?",
    answer:
      "Simply browse events on Ticketeer, select the one you’re interested in, choose your ticket type, and proceed with our secure checkout process.",
  },
  {
    question: "How do I create and publish an event on Ticketeer?",
    answer:
      "Log in to your account and click on “Create Event.” Fill out the event details including title, date, venue, ticket options, and images. Once you're ready, publish it — your event will go live instantly!",
  },
  {
    question: "Where can I find the tickets I’ve purchased?",
    answer:
      "All your purchased tickets are stored in your Ticketeer account under 'My Tickets.' You’ll also receive them by email for easy access at the event.",
  },
  {
    question: "How can I track ticket sales and attendees?",
    answer:
      "Our built-in dashboard lets you monitor real-time ticket sales, view attendee lists, and analyze event performance with detailed analytics.",
  },
];

const power = [
  {
    title: "Real-time Analytics",
    desc: "Track ticket sales, revenue, and attendee insights in real time.",
    icon: <MdAnalytics className="text-orange-500 text-3xl" />,
  },
  {
    title: "Check-in",
    desc: "Speed up entry with either email and password or Google sign-in.",
    icon: <FaMobileAlt className="text-orange-500 text-3xl" />,
  },
  {
    title: "Payment Integration",
    desc: "Accept global payments securely with Flutterwave and Paystack integrations.",
    icon: <TbCurrencyNaira className="text-orange-500 text-3xl" />,
  },
  {
    title: "Event Dashboard",
    desc: "Manage events, attendees, and ticket purchase all in one place.",
    icon: <MdOutlineDashboardCustomize className="text-orange-500 text-3xl" />,
  },
  {
    title: "Email Notifications",
    desc: "Both organizers and attendees receive email notification to keep track of all activities.",
    icon: <MdOutlineMailOutline className="text-orange-500 text-3xl" />,
  },
  {
    title: "Explore Events",
    desc: "Explore events and purchase tickets of your choice",
    // icon: <MdOutlineMailOutline className="text-orange-500 text-3xl"/>,
    icon: <MdOutlineExplore className="text-orange-500 text-3xl" />,
  },
];

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const [openStates, setOpenStates] = useState(
    new Array(faq.length).fill(false)
  );

  const toggleOpen = (index) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  if (showSplash) return <SplashScreen onComplete={() => { }} />;

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-950 min-h-screen flex flex-col gap-24 pb-32">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          style={{ backgroundImage: `url(${hero})` }}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center brightness-75"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 text-center px-6 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-merriweather drop-shadow-md">
            Experience Events Like Never Before
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-inter max-w-xl drop-shadow-sm">
            Discover and host unforgettable moments. Your next concert, festival,
            or show starts here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/create-event">
              <button className="bg-orange-500 hover:bg-orange-600 px-10 sm:px-12 py-3 rounded-full text-white text-base sm:text-lg font-medium transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent">
                Create Event
              </button>
            </Link>
            <Link to="/event-list">
              <button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 px-10 sm:px-12 py-3 rounded-full text-white text-base sm:text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
                Explore Events
              </button>
            </Link>
          </div>
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/80 animate-bounce">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* Vibe Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center flex flex-col items-center gap-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-merriweather text-zinc-900 dark:text-white">
          What’s your <span className="text-orange-500">Vibe</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ text, about, image }, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={image}
                alt={text}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5 text-left flex flex-col gap-2">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {text}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  {about}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex flex-col gap-10">
        <h2 className="text-3xl md:text-4xl font-bold font-merriweather text-zinc-900 dark:text-white">
          How It Works
        </h2>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-shadow rounded-2xl"
            >
              <div className="p-3 bg-orange-100 dark:bg-zinc-700 rounded-full">
                {step.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-lora text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="font-inter text-base text-gray-700 dark:text-zinc-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Powering Events Section */}
      <section
        id="events"
        className="bg-gradient-to-b from-orange-50/50 to-white dark:from-zinc-900 dark:to-zinc-950 pt-16 pb-16 px-6 md:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-merriweather text-zinc-900 dark:text-white">
            Powering Seamless Events
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            From secure payments to smart check-ins, Ticketeer gives you the
            tools to create unforgettable experiences with ease.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {power.map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="bg-orange-50 dark:bg-zinc-800 rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-100 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-10 px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold font-merriweather text-zinc-900 dark:text-white">
          Why choose us?
        </h2>
        <div className="flex flex-col gap-4">
          {choice.map(({ strong, normal }, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 hover:pl-2 transition-all duration-200"
            >
              <FaCheckCircle className="text-orange-500 mt-1 w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-inter font-semibold text-lg sm:text-xl text-gray-900 dark:text-white">
                  {strong}
                </span>
                <span className="font-inter text-base sm:text-lg text-gray-600 dark:text-zinc-300">
                  {normal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-12 pt-8 md:pt-12 font-inter">
        <h2 className="text-3xl md:text-4xl font-bold font-merriweather text-zinc-900 dark:text-white mb-8">
          FAQs
        </h2>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-700 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white/50 dark:bg-zinc-800/30">
          {faq?.map(({ question, answer }, index) => {
            const isOpen = openStates[index];
            return (
              <div key={index} className="px-4 sm:px-6 py-4 md:py-5">
                <button
                  onClick={() => toggleOpen(index)}
                  aria-expanded={isOpen}
                  className="flex justify-between items-center gap-4 w-full text-left group"
                >
                  <span className="font-medium text-base sm:text-lg text-zinc-800 dark:text-zinc-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {question}
                  </span>
                  <span className="flex-shrink-0 text-orange-500 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <FaAngleDown className="w-5 h-5" />
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 pl-0 text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
