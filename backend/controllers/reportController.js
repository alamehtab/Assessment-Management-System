const fs = require("fs");
const path = require("path");
const generatePDF = require("../utils/generatePDF");
const reportConfig = require("../config/reportConfig");
const dataFile = path.join(__dirname, "../data/data.json");
const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

exports.generateReport = async (req, res) => {
  const { session_id, userEmail } = req.body;
  if (!session_id || !userEmail) {
    return res.status(400).json({ message: "Session ID and userEmail are required" });
  }

  const sessionData = data.find(d => d.session_id === session_id);
  if (!sessionData) return res.status(404).json({ message: "Session not found" });

  const assessment_id = sessionData.assessment_id;
  const config = reportConfig[assessment_id];
  if (!config) return res.status(400).json({ message: "No report config for this assessment" });

  try {
    const pdfPath = await generatePDF(sessionData, config, userEmail);
    res.status(200).json({ message: "Report generated successfully", path: pdfPath });
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Error generating report" });
  }
};

exports.getUserReports = (req, res) => {
  const { userEmail } = req.query;
  const userDir = path.join(__dirname, "../reports", userEmail);
  if (!fs.existsSync(userDir)) return res.status(200).json({ pdfs: [] });

  const files = fs.readdirSync(userDir);
  const pdfs = files.map(fileName => ({
    name: fileName,
    path: `/reports/${userEmail}/${fileName}`
  }));
  res.status(200).json({ pdfs });
};

exports.deleteUserReport = (req, res) => {
  const { userEmail, fileName } = req.body;
  if (!userEmail || !fileName) {
    return res.status(400).json({ message: "userEmail and fileName are required" });
  }

  const filePath = path.join(__dirname, "../reports", userEmail, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (err) {
    console.error("Error deleting PDF:", err);
    res.status(500).json({ message: "Failed to delete PDF" });
  }
};
