const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

function getNestedValue(obj, pathStr) {
  if (!pathStr) return "N/A";
  const val = pathStr.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  return val !== null && val !== undefined && val !== "" ? val : "N/A";
}

function generateExercisesTable(exercises) {
  if (!exercises || exercises.length === 0) return "<tr><td colspan='5'>No exercises found</td></tr>";

  return exercises.map(ex => {
    const name = ex.name || "N/A";
    const totalReps = ex.totalReps ?? "N/A";
    const correctReps = ex.correctReps ?? "N/A";
    const score = ex.analysisScore ?? ex.setList?.[0]?.additionalFields?.find(f => f.fieldName === "accuracy")?.fieldValue ?? "N/A";
    const tips = ex.tipsList?.length ? ex.tipsList.join("; ") : "No tips available";

    return `<tr>
      <td>${name}</td>
      <td>${totalReps}</td>
      <td>${correctReps}</td>
      <td>${score}</td>
      <td>${tips}</td>
    </tr>`;
  }).join("");
}

module.exports = async function generatePDF(data, config, userEmail) {
  const reportsDir = path.join(__dirname, "../reports", userEmail);
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const templatePath = path.join(__dirname, "../templates/reportTemplate.html");
  if (!fs.existsSync(templatePath)) throw new Error("Template file not found at " + templatePath);

  let html = fs.readFileSync(templatePath, "utf-8");

  // Fill all fields
  for (let key in config.fields) {
    const value = getNestedValue(data, config.fields[key]);
    html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  // Body composition fields
  const bodyComp = data.bodyCompositionData || {};
  ["BFC", "LM", "BMR", "FMI", "AGR", "WHR"].forEach(field => {
    html = html.replace(new RegExp(`{{${field}}}`, "g"), bodyComp[field] ?? "N/A");
  });

  // Exercises table
  html = html.replace("{{exercise_table_rows}}", generateExercisesTable(data.exercises));

  // Unreplaced placeholders
  html = html.replace(/{{\w+}}/g, "N/A");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const fileName = `report_${data.session_id}.pdf`;
  const pdfPath = path.join(reportsDir, fileName);
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  return `/reports/${userEmail}/${fileName}`;
};
