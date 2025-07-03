import React from "react";
import image from "./../../assets/event-image.png";

const events = [
  {
    title: "Conference",
    description: "A party to have fun and connect",
    organizer: "Rodiyat",
    location: "Nigeria",
    image: image,
    startDate: "Mar 3, 2024",
    endDate: "Mar 5, 2024",
    startTime: "10 : 00 AM",
    endTime: "15 : 30 PM",
    attendees: [],
    tickets: [],
    limit: 5,
    hasBooked: false,
    reviews: [],
    averageRating: 4,
    price: 20,
  },
  {
    title: "Business",
    description: "A party to have fun and connect",
    organizer: "Rodiyat",
    location: "Nigeria",
    image: image,
    startDate: "Mar 3, 2024",
    endDate: "Mar 5, 2024",
    startTime: "10 : 00 AM",
    endTime: "15 : 30 PM",
    attendees: [],
    tickets: [],
    limit: 5,
    hasBooked: false,
    reviews: [],
    averageRating: 4,
    price: 20,
  },
  {
    title: "Sports",
    description: "A party to have fun and connect",
    organizer: "Rodiyat",
    location: "Nigeria",
    image: image,
    startDate: "Mar 3, 2024",
    endDate: "Mar 5, 2024",
    startTime: "10 : 00 AM",
    endTime: "15 : 30 PM",
    attendees: [],
    tickets: [],
    limit: 5,
    hasBooked: false,
    reviews: [],
    averageRating: 4,
    price: 20,
  },
];

const EventFlexView = () => {
  return (
    <section>
      <div className="w-full py-3 font-inter">
        <div className="w-full">
          <table className="w-full table-auto border-collapse">
            <thead className="border-b border-gray-400">
              <tr className="">
                <th className="text-left px-4 py-3 font-medium text-base">
                  Event
                </th>
                <th className="text-left px-4 py-3 font-medium text-base">
                  Date
                </th>
                <th className="text-left px-4 py-3 font-medium text-base">
                  Location
                </th>
                <th className="text-left px-4 py-3 font-medium text-base">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="border-b border-gray-400">
                  <td className="px-4 py-4 text-sm">{event.title}</td>
                  <td className="px-4 py-4 text-sm">{event.startDate}</td>
                  <td className="px-4 py-4 text-sm">{event.location}</td>
                  <td className="px-4 py-4 text-sm">{event.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default EventFlexView;
