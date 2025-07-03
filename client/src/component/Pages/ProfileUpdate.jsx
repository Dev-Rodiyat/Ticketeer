import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../Layout/PasswordInput";
import { toast } from "react-toastify";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    interests: [],
    photo: "",
    password: "",
    oldPassword: "",
    confirmNewPassword: "",
    socialMediaLinks: {
      facebook: "",
      x: "",
      instagram: "",
      linkedin: "",
      telegram: "",
    },
  });

  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/get-user`, {
          withCredentials: true,
        });
        const userData = response.data;
        setProfilePhoto(userData.photo?.imageUrl);
        setFormData({
          name: userData.name || "",
          location: userData.location || "",
          photo: userData.photo || "",
          interests: userData.interests || [],
          socialMediaLinks: userData.socialMediaLinks || {
            facebook: "",
            x: "",
            instagram: "",
            linkedin: "",
            telegram: "",
          },
        });
        setOriginalData(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setIsFormChanged(JSON.stringify(formData) !== JSON.stringify(originalData));
  }, [formData, originalData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if input is for social media
    if (name.startsWith("socialMediaLinks.")) {
      const key = name.split(".")[1]; // Extract the social media platform key
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(""); // Clear error when user types
  };

  const handlePastePassword = (e) => {
    e.preventDefault();
    toast.error("Cannot paste into this field");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isFormChanged) return;
    setLoading(true);
    setIsSubmitting(true);
    setError("");

    try {
      const { oldPassword, password, confirmNewPassword } = formData;

      if (password && oldPassword === password) {
        setError("New password should be different from the old password");
        throw new Error("New password should be different from old password");
      }
      if (password !== confirmNewPassword) {
        setError("Confirmed password does not match new password");
        throw new Error("Confirmed password does not match new password");
      }

      const response = await axios.patch(
        `${SERVER_URL}/user/update-user`,
        formData,
        { withCredentials: true }
      );

      if (response?.data) {
        toast.success(response.data.message || "Profile updated successfully");
        navigate("/settings");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Internal server error";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, photo: file }));
      setIsPhotoChanged(true);
    }
  };

  const handlePhotoUpload = async () => {
    if (!isPhotoChanged) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("photo", formData.photo);

      const response = await axios.post(
        `${SERVER_URL}/user/upload-photo`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.photo?.imageUrl) {
        setProfilePhoto(response.data.photo.imageUrl);
        setFormData((prev) => ({
          ...prev,
          photo: response.data.photo.imageUrl,
        }));
        setIsPhotoChanged(false);
        toast.success("Profile picture updated successfully!");
        navigate("/settings");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-orange-100 py-28 font-inter">
      <div className="relative flex flex-col gap-5 py-6 px-1 rounded-xl shadow-lg bg-orange-300 bg-opacity-50">
        <div className="flex justify-between items-center gap-6 border-b border-gray-600 px-4 py-2">
          <Link to="/settings">
            <FaArrowLeft size={20} />
          </Link>
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-xl">Edit Profile</p>
            <p className="font-normal text-sm">
              Make your information stand out by keeping it up to date.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full bg-white">
                <img
                  src={profilePhoto}
                  alt={`${formData.name}'s image`}
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                hidden
                id="photoUpload"
              />
              <label
                htmlFor="photoUpload"
                className="flex items-center gap-1 cursor-pointer"
              >
                <MdAdd />
                <p>Add image</p>
              </label>
            </div>

            <button
              type="button"
              onClick={handlePhotoUpload}
              className={`py-2 px-2 text-white text-center rounded-md text-xs max-w-[120px] ${
                isPhotoChanged
                  ? "bg-slate-500 hover:bg-slate-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isPhotoChanged}
            >
              Update Image
            </button>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium pl-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="font-medium pl-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={handleInputChange}
                value={formData.location}
                className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="oldPassword" className="font-medium pl-1">
                Old Password
              </label>
              <input
                placeholder="old password"
                type="password"
                id="oldPassword"
                name="oldPassword"
                onChange={handleInputChange}
                value={formData.oldPassword}
                className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium pl-1">
                New Password
              </label>
              <PasswordInput
                placeholder="New Password"
                id="password"
                name="password"
                className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300 w-full"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmNewPassword" className="font-medium pl-1">
                Confirm New Password
              </label>
              <PasswordInput
                placeholder="Confirm New password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300 w-full"
                onPaste={handlePastePassword}
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-5 pt-4">
              <div className="flex flex-col gap-0">
                <p className="font-medium text-xl">Social Handles</p>
                <p className="font-normal text-sm">
                  Add the url of your social handles to attach your accounts
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="url"
                  id="facebook"
                  name="socialMediaLinks.facebook"
                  placeholder="Enter Facebook URL"
                  onChange={handleInputChange}
                  value={formData.socialMediaLinks.facebook}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
                />

                <input
                  type="url"
                  id="x"
                  name="socialMediaLinks.x"
                  placeholder="Enter X URL"
                  onChange={handleInputChange}
                  value={formData.socialMediaLinks.x}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
                />

                <input
                  type="url"
                  id="instagram"
                  name="socialMediaLinks.instagram"
                  placeholder="Enter Instagram URL"
                  onChange={handleInputChange}
                  value={formData.socialMediaLinks.instagram}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
                />

                <input
                  type="url"
                  id="linkedin"
                  name="socialMediaLinks.linkedin"
                  placeholder="Enter LinkedIn URL"
                  onChange={handleInputChange}
                  value={formData.socialMediaLinks.linkedin}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
                />

                <input
                  type="url"
                  id="telegram"
                  name="socialMediaLinks.telegram"
                  placeholder="Enter Telegram URL"
                  onChange={handleInputChange}
                  value={formData.socialMediaLinks.telegram}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-400 focus:outline-none focus:border-orange-300 w-full"
                />
              </div>
            </div>

            <p className="text-red-500">{error}</p>

            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className={`py-3 px-14 text-white text-center rounded-md text-sm max-w-[300px] ${
                  isFormChanged
                    ? "bg-slate-500 hover:bg-slate-600"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                disabled={!isFormChanged || loading || isSubmitting}
              >
                {loading ? "Updating Profile..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
