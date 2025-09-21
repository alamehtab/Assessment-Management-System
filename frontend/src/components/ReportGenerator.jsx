import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ReportGenerator = () => {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!sessionId) {
      setMessage("Please enter a session ID.");
      toast.error("Please enter a session ID.");
      return;
    }
    if (!user?.email) {
      setMessage("User email not found. Please log in again.");
      toast.error("User email not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/report/generate/pdf",
        {
          session_id: sessionId,
          userEmail: user.email,
        }
      );
      if (response.status === 200) {
        setMessage("Report generated successfully!");
        toast.success("Report generated successfully!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("Wrong Session ID entered! Session ID not found.");
          toast.error("Wrong Session ID entered! Session ID not found.");
        } else if (error.response.status === 400) {
          setMessage(error.response.data.message || "No report config for this assessment.");
          toast.error(error.response.data.message || "No report config for this assessment.");
        } else {
          setMessage(error.response.data.message || "Failed to generate report.");
          toast.error(error.response.data.message || "Failed to generate report.");
        }
      } else {
        setMessage("Something went wrong. Try again later.");
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Generate PDF Report</h2>
      <input
        type="text"
        placeholder="Enter Session ID"
        className="w-full border px-3 py-2 mb-4 rounded"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Generate Report
      </button>
      {message && <p className="mt-4 text-center text-black">{message}</p>}
    </div>
  );
};

export default ReportGenerator;
