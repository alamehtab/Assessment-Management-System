import React, { useState, useEffect, useContext } from "react";
import { FaDownload, FaFilePdf, FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const DownloadPDFs = () => {
  const [pdfList, setPdfList] = useState([]);
  const { user } = useContext(AuthContext);

  // ✅ Fetch PDFs wrapped in a function so we can reuse it
  const fetchPDFs = () => {
    if (user?.email) {
      axios
        .get("http://localhost:5000/report/download/pdf", {
          params: { userEmail: user.email },
        })
        .then((res) => setPdfList(res.data.pdfs))
        .catch((err) =>{
           console.error("Error fetching PDFs:", err)
            toast.error("Failed to fetch PDFs. Please try again.");
        });
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, [user]);

  const handleDelete = (fileName) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    axios.delete("http://localhost:5000/report/delete/pdf", {data: { userEmail: user.email, fileName },})
      .then(() => {
        fetchPDFs();
      }).catch((err) =>{
         console.error("Error deleting PDF:", err)
         toast.error("Failed to delete the PDF. Please try again.");
      });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
      {pdfList.length === 0 ? (
        <p className="text-center text-gray-600">No reports generated yet.</p>
      ) : (
        <ul className="space-y-3">
          {pdfList.map((pdf, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaFilePdf className="text-red-600" />
                <span className="text-gray-800">{pdf.name}</span>
              </div>
              <div className="flex space-x-4">
                {/* Preview in new tab */}
                <a
                  href={`http://localhost:5000${pdf.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <FaEye />
                </a>
                {/* Force download */}
                <a
                  href={`http://localhost:5000${pdf.path}`}
                  download
                  className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                >
                  <FaDownload />
                </a>
                {/* Delete */}
                <button
                  onClick={() => handleDelete(pdf.name)}
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadPDFs;
