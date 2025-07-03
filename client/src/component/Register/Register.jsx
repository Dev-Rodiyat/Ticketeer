import React, { useState } from "react";
// import register from './../../assets/register.png'
// import register from './../../assets/reg.png'
// import register from './../../assets/regs.png'
import register from "./../../assets/regi.png";
import { toast } from "react-toastify";
import PasswordInput from "../Layout/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear the error when the user types
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePastePassword = (e) => {
    e.preventDefault();
    toast.error("Cannot paste into this field");
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    setError(""); // Reset error before validation

    try {
      const { name, email, password, confirmPassword } = formData;

      if (!name || !email || !password || !confirmPassword) {
        setError("Oops, all fields are required");
        throw new Error("All fields are required");
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(
        `${SERVER_URL}/user/register`,
        formData,
        { withCredentials: true }
      );

      if (response?.data) {
        setUser(response.data);
        toast.success("Registration Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Internal server error";
      setError(errorMessage); // Set error message
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 md:py-10 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch justify-center bg-white rounded-2xl shadow-md overflow-hidden min-h-[600px]">
          {/* Image Section */}
          <div className="hidden lg:flex lg:w-1/2 h-auto lg:h-full">
            <img
              src={register}
              alt="Registration illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 px-6 lg:px-8 py-4 lg:py-6 flex flex-col justify-center">
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold font-merriweather">
                Get Ready to Experience More!
              </h1>
              <p className="font-inter text-gray-600">
                Sign up and unlock access to the best events near you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 max-w-md mx-auto flex flex-col gap-4 font-inter"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-medium pl-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Please fill your full name"
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium pl-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please fill your email"
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-medium pl-1">
                  Password
                </label>
                <PasswordInput
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  required
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300 w-full"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="font-medium pl-1">
                  Confirm Password
                </label>
                <PasswordInput
                  placeholder="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300 w-full"
                  onPaste={handlePastePassword}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-2 items-start mt-1">
                <input
                  type="checkbox"
                  className="mt-1 cursor-pointer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms-and-conditions">
                    <span className="text-orange-600 hover:text-orange-700 hover:underline">
                      terms & conditions
                    </span>
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy">
                    <span className="text-orange-600 hover:text-orange-700 hover:underline">
                      privacy policy
                    </span>
                  </Link>{" "}
                  of Ticketeer
                </p>
              </div>

              <div className="flex flex-col gap-4 items-center mt-2 font-inter">
                <button
                  type="submit"
                  className={`py-3 px-6 w-full md:w-2/3 font-medium rounded-full transition-all duration-300 text-white ${
                    isChecked
                      ? "bg-orange-400 hover:bg-orange-500"
                      : "bg-orange-300 cursor-not-allowed"
                  }`}
                  disabled={!isChecked || loading || isSubmitting}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="font-bold text-lg">OR</p>
                <button className="bg-orange-50 p-3 rounded-full hover:bg-orange-100">
                  <FcGoogle size={30} />
                </button>
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span className="text-orange-400 hover:text-orange-600">
                    <Link to="/login">Login</Link>
                  </span>
                </p>
                <p className="text-xs text-gray-600">
                  Need help?{" "}
                  <span className="text-orange-400 hover:text-orange-600">
                    <Link to="/contact">Contact Support</Link>
                  </span>
                </p>
              </div>
            </form>
            <div className="flex justify-end">
              <Link to="/">
                <p className="text-base text-gray-600 hover:text-red-400 mt-2">
                  - Home
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
