import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    if (errors.email || errors.password || errors.confirmPassword) return;
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
      });
      if (res.status === 200) {
        navigate("/login");
        toast.success("Registration successful! Please log in.")
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setServerError(err.response.data.message || "Registration failed");
        toast.error(err.response.data.message || "Registration failed");
      } else {
        setServerError("Something went wrong. Try again later.");
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="min-h-screen flex flex-col justify-center px-6 py-12 sm:px-6 lg:px-8 bg-gray-900"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setErrors((prev) => ({
                    ...prev,
                    email: emailRegex.test(value)
                      ? ""
                      : "Please enter a valid email address",
                  }));
                }}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  const regex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_]).{6,}$/;
                  setErrors((prev) => ({
                    ...prev,
                    password: regex.test(value)
                      ? ""
                      : "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special char, min 6 chars",
                    confirmPassword:
                      confirmPassword && value !== confirmPassword
                        ? "Passwords do not match"
                        : "",
                  }));
                }}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword:
                      e.target.value !== password
                        ? "Passwords do not match"
                        : "",
                  }));
                }}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Register
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
