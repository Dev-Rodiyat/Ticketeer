import React from "react";
import TicketeerLogo from "./../../assets/Ticketeer-Logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";
import { FaUser, FaCog, FaHome, FaRegChartBar } from "react-icons/fa";
import { MdOutlineEventNote, MdCreateNewFolder } from "react-icons/md";
import {MdEventBusy} from "react-icons/md";

const sideLink = [
  { title: "Dashboard", route: "/dashboard" },
  { title: "Create Event", route: "/create-event" },
  { title: "Events", route: "/event-list" },
  // { title: "Tickets", route: "/tickets" },
  // { title: "Sales & reports", route: "/reports" },
  { title: "Settings", route: "/settings" },
];

const iconMap = {
  Dashboard: FaHome,
  "Create Event": MdCreateNewFolder,
  Events: MdOutlineEventNote,
  Tickets: TbTicket,
  "Sales & reports": FaRegChartBar,
  Settings: FaCog,
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  if (!isOpen) return null; // Hide sidebar when isOpen is false

  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 lg:w-full font-inter font-medium">
      <div className="lg:p-8 lg:h-screen px-3 flex flex-col justify-between p-5 bg-orange-300 lg:w-3/12">
        <div className="flex flex-col justify-between gap-10">
          <button onClick={onClose} className="self-start">
            <FaArrowLeft />
          </button>
          <ul className="flex flex-col gap-4">
            {sideLink.map(({ title, route }, index) => {
              const IconComponent = iconMap[title] || FaRegChartBar;
              return (
                <Link
                  to={route}
                  key={index}
                  onClick={onClose}
                  className={
                    route === location.pathname ? "bg-orange-50 rounded-lg" : ""
                  }
                >
                  <div
                    className="flex gap-2 items-center hover:bg-orange-100 rounded-lg cursor-pointer px-4 py-2"
                  >
                    <IconComponent size={20} className="text-black" />
                    <li className="hover:cursor-pointer lg:text-lg">{title}</li>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <img src={TicketeerLogo} alt="Ticketeer Logo" />
          </div>
          <p className="text-xs text-gray-900 text-center">
            Need help?{" "}
            <span className="text-orange-500 hover:text-orange-600">
              <Link to="/contact" onClick={onClose}>
                Contact Support
              </Link>
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
