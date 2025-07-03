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

const EventGridView = () => {
  return (
    <section>
      <div className="flex w-full mt-6 font-inter px-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-eventImage bg-no-repeat bg-cover bg-center w-full h-[200px] flex items-end shadow-md rounded-2xl overflow-hidden p-2">
              <div className="bg-orange-200 flex justify-between items-center w-full rounded-lg bg-opacity-60 p-3 backdrop-blur-sm">
                <div className="flex flex-col gap-1 text-black">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm">{event.startDate}</p>
                </div>
                <div className="flex justify-center items-center bg-slate-400 rounded-lg h-[40px] w-[50px] px-3">
                  <p className="text-white font-bold">{event.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventGridView;
