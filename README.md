# Assessment Management System

A **Full-Stack Web Application** for generating dynamic PDF reports from pre-existing assessment data.  
The system is designed to handle multiple assessment types **without requiring any code modifications**, fully driven by configuration.

---

## Table of Contents
1. [Overview](#overview)  
1. [Folder Structure](#Folder-Structure)  
2. [Features](#features)  
3. [Setup and Installation](#setup-and-installation)  
4. [Configuration System](#configuration-system)  
5. [Adding New Assessment Types](#adding-new-assessment-types)  
6. [Modifying Data Field Mappings](#modifying-data-field-mappings)  
7. [Updating Classification Ranges](#updating-classification-ranges)  
9. [Usage](#usage)  

---

## Overview

The Assessment Management System reads assessment data from a local data file data.js and generates PDF reports using Puppeteer.  

It supports multiple assessment types, each with its own configurable sections, fields, and classification ranges. The system is designed to handle new assessment types purely through configuration, without changing backend code.

## Folder Structure
assignment/
│
├─ backend/
│  ├─ config/
│  ├─ controllers/
│  ├─ data/
│  ├─ node_modules/
│  ├─ reports/
│  ├─ routes/
│  └─ templates/
│  └─ utils/
│  └─ package.json
│  └─ server.js
│
├─ frontend/
│  ├─ src/
│  ├─ public/
│  └─ package.json
│
└─ README.md

## Features

- User authentication (signup/login)  
- API endpoint to generate PDF reports by `session_id`  
- Flexible configuration system for multiple assessment types  
- Dynamic table generation for exercises  
- Classification of metrics (BMI, heart rate, blood pressure, etc.)  
- React.js frontend with Tailwind CSS  
- PDFs saved in user-specific folders  

## Setup and Installation
npm install
Start the react app and the backend separately
cd .\frontend\
npm run dev
Create another terminal 
cd .\backend\
npm run dev
Then click on the react-app link e.g. http://localhost:5173/
add login or register in the url e.g. http://localhost:5173/register

## Configuration System
The system is fully driven by configuration files:
assessmentConfig.js – Defines which sections and fields to display for each assessment_id.
reportConfig.js – Defines value classifications and additional report-level configurations.
Key Features:
Dynamic section definitions per assessment type
JSON path-based field mappings
Configurable value classifications for metrics
Support for multiple assessment types without code changes

## Adding New Assessment Types
Open assessmentConfig.js.
Add a new entry with a unique assessment_id:
as_new_01: {
  sections: ['Key Body Vitals', 'Fitness Overview', 'Body Composition'],
  fields: {
    session_id: 'session_id',
    accuracy: 'accuracy',
    heart_rate: 'vitalsMap.vitals.heart_rate',
    BMI: 'bodyCompositionData.BMI',
    vo2_max: 'fitnessData.vo2_max'
  }
}
Open reportConfig.js to add classification ranges for new fields if needed:
heart_rate: [
  { min: 0, max: 59, label: 'Below Normal' },
  { min: 60, max: 100, label: 'Normal' },
  { min: 101, max: Infinity, label: 'High' }
]
Save the files. No backend code changes are required.

## Modifying Data Field Mappings
Each field in assessmentConfig.js maps to a JSON path in the assessment data.
Example:
vo2_max: 'fitnessData.vo2_max'
posture: 'postureData.score'
Update the path to match your data structure if required.

## Updating Classification Ranges
Classification ranges are defined in reportConfig.js.
Example for BMI:
BMI: [
  { min: 0, max: 18.4, label: "Underweight" },
  { min: 18.5, max: 24.9, label: "Normal" },
  { min: 25, max: 29.9, label: "Overweight" },
  { min: 30, max: Infinity, label: "Obese" }
]
Adjust the min and max values to update thresholds for any metric.

## Usage
Register a new user via the frontend signup form.
Log in with your credentials.
Generate a PDF report by entering a session_id and clicking Generate PDF.
PDFs are saved in backend/reports/<user_email>/report_<session_id>.pdf.
To add new assessment types or update fields, only modify assessmentConfig.js and reportConfig.js.
This system is fully configuration-driven, allowing addition of new assessment types, mapping fields, and updating classifications without touching backend code. It is designed to be scalable and easy to maintain for any future assessment expansions.