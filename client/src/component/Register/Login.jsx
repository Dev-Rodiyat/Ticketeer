import React, { useState } from "react";
import login from "./../../assets/About-Show-Ticket.png";
// import login from './../../assets/register.png'
import PasswordInput from "../Layout/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import Dashboard from "../Pages/Dashboard";

const BASE_URL = import.meta.env.SERVER_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = formData;
      
      if( !email || !password ) {
        toast.error('All fields are required');
        return;
      }
      setIsSubmitting(true);

      // console.log({formData});
      
      const response = await axios.post(`http://localhost:4000/user/login`, formData, {withCredentials: true});
      // localStorage.setItem("authToken", data.token);
      console.log(response);
      toast.success('Login Successful');
      setUser(response.data)
      navigate('/dashboard')

    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message)
        setError(error?.response?.data?.message)
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    };
  }
  return (
    <div className="h-screen flex items-center justify-center py-8 md:py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch justify-center bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="hidden lg:flex lg:w-1/2 lg:h-full">
            <img
              src={login}
              alt="Login illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 px-6 lg:px-12 py-8 flex flex-col gap-5 justify-center">
            <div className="text-center flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-bold font-merriweather">
                Let's Get You Back to the Action!
              </h1>
              <p className="font-inter text-gray-600">
                Log in to book and manage your tickets.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4 font-inter">
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
                  value={formData.email} onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium pl-1">
                  Password
                </label>
                <PasswordInput
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  required={true}
                  className="bg-orange-50 p-2 rounded-lg border-b-2 border-orange-200 focus:outline-none focus:border-orange-300 w-full"
                  value={formData.password} onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-4 items-center mt-2">
                <button
                  type="submit"
                  className="py-3 px-6 w-full md:w-2/3 font-medium rounded-full transition-all duration-300 text-white bg-orange-400 hover:bg-orange-500"
                  disabled={loading || isSubmitting}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="font-bold text-lg">OR</p>
                <button className="bg-orange-50 p-3 rounded-full hover:bg-orange-100">
                  <FcGoogle size={30} />
                </button>

                <p className="text-sm text-gray-600">
                  New to Ticketeer?{" "}
                  <span className="text-orange-400 hover:text-orange-600">
                    <Link to="/register">Sign Up</Link>
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
                <p className="text-base text-gray-600 hover:text-red-400">
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

export default Login;
