import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiTelegram } from "react-icons/si";
import { toast } from "react-toastify";

const SocialMediaShare = ({ eventId, eventName }) => {
  const eventURL = encodeURIComponent(
    `https://yourwebsite.com/event/${eventId}`
  );
  const text = encodeURIComponent(`Check out this event: ${eventName}`);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${eventURL}`,
    x: `https://twitter.com/intent/tweet?url=${eventURL}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${eventURL}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${eventURL}`,
    telegram: `https://t.me/share/url?url=${eventURL}&text=${text}`,
    google: `mailto:?subject=Check%20out%20this%20event!&body=${text}%20${eventURL}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://yourwebsite.com/event/${eventId}`);
    toast.success(
      "Event link copied! You can paste it on Instagram or YouTube."
    );
  };

  return (
    <div className="flex gap-3 mt-4">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        <button className="text-blue-500 bg-white rounded-full">
          <FaFacebook size={24} />
        </button>
      </a>
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <button className="">
          <FaXTwitter size={24} />
        </button>
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500"
      >
        <button className="text-green-700">
          <BsWhatsapp size={24} />
        </button>
      </a>
      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        <button className="text-blue-400 bg-white rounded-full">
          <SiTelegram size={24} />
        </button>
      </a>
      <a
        href={shareLinks.google}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <FcGoogle size={24} />
      </a>
      <button onClick={copyToClipboard} className="">
        <FaInstagram size={24} />
      </button>
      <button onClick={copyToClipboard} className="text-red-600">
        <FaYoutube size={24} />
      </button>
    </div>
  );
};

export default SocialMediaShare;
