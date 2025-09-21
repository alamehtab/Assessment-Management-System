import React, { useState, useContext } from "react";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaDownload,
  FaRegFilePdf,
  FaExternalLinkAlt,
} from "react-icons/fa";
import ReportGenerator from "../components/ReportGenerator";
import { AuthContext } from "../context/AuthContext";
import DownloadPDFs from "../components/DownloadPDFs"; // updated component will handle open/download

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("home"); // home, reports, downloads
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setMobileDropdownOpen(false); // close mobile dropdown
  };

  const getUserName = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (desktop only) */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 hidden md:flex flex-col overflow-hidden ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <h1
            className={`text-lg underline font-bold ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          <button
            onClick={() => handleSectionClick("home")}
            className={`flex items-center w-full px-2 py-2 rounded hover:bg-gray-700 ${
              activeSection === "home" ? "bg-gray-700" : ""
            }`}
          >
            <FaTachometerAlt className="mr-2" />
            {sidebarOpen && <span>Home</span>}
          </button>
          <button
            onClick={() => handleSectionClick("reports")}
            className={`flex items-center w-full px-2 py-2 rounded hover:bg-gray-700 ${
              activeSection === "reports" ? "bg-gray-700" : ""
            }`}
          >
            <FaFileAlt className="mr-2" />
            {sidebarOpen && <span>Reports</span>}
          </button>
          <button
            onClick={() => handleSectionClick("downloads")}
            className={`flex items-center w-full px-2 py-2 rounded hover:bg-gray-700 ${
              activeSection === "downloads" ? "bg-gray-700" : ""
            }`}
          >
            <FaDownload className="mr-2" />
            {sidebarOpen && <span>Downloads</span>}
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center px-2 py-2 mb-4 mx-2 rounded hover:bg-red-600 text-white whitespace-nowrap overflow-hidden"
        >
          <FaSignOutAlt className="mr-2" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-700"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              <FaBars size={24} />
            </button>
            <h2 className="text-2xl font-semibold">
              {activeSection === "home"
                ? "Home"
                : activeSection === "reports"
                ? "Reports"
                : "Downloads"}
            </h2>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-gray-700 font-medium">
            <FaUserCircle size={24} />
            <span>Hi, {getUserName(user?.email)}</span>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileDropdownOpen && (
          <div className="md:hidden bg-white shadow-lg w-full z-10">
            <button
              onClick={() => handleSectionClick("home")}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 ${
                activeSection === "home" ? "bg-gray-200" : ""
              }`}
            >
              <FaTachometerAlt />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleSectionClick("reports")}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 ${
                activeSection === "reports" ? "bg-gray-200" : ""
              }`}
            >
              <FaFileAlt />
              <span>Reports</span>
            </button>
            <button
              onClick={() => handleSectionClick("downloads")}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 ${
                activeSection === "downloads" ? "bg-gray-200" : ""
              }`}
            >
              <FaDownload />
              <span>Downloads</span>
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-red-600 hover:text-white"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 w-full overflow-y-auto">
          {activeSection === "home" && (
            <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl text-center">
              <h3 className="text-xl font-semibold mb-4">
                Welcome to Home
              </h3>
              <p>This is the home section of your dashboard.</p>
            </div>
          )}

          {activeSection === "reports" && (
            <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Reports
              </h3>
              <div className="flex justify-center">
                <ReportGenerator />
              </div>
            </div>
          )}

          {activeSection === "downloads" && (
            <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
              <h3 className="text-xl font-semibold mb-4 text-center">
                My Downloads
              </h3>
              <DownloadPDFs
                icons={{
                  pdf: <FaRegFilePdf className="text-red-600" />,
                  open: <FaExternalLinkAlt className="text-blue-600" />,
                  download: <FaDownload className="text-green-600" />,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
