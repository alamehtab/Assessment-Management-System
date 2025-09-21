import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password, });
      if (res.status === 200) {
        const userData = { email, token: res.data.token };
        login(userData);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        toast.success("Login successful!");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
        toast.error(err.response.data.message || "Login failed");
      } else {
        setError("Something went wrong. Try again later.");
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="min-h-screen flex flex-col justify-center px-6 py-12 sm:px-6 lg:px-8 bg-gray-900"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Sign in to your account
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
                placeholder="Enter your Email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
