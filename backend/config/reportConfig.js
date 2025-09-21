module.exports = {
  as_hr_02: {
    sections: [
      "Key Body Vitals",
      "Heart Health",
      "Stress Level",
      "Fitness Levels",
      "Posture",
      "Body Composition",
    ],
    fields: {
      session_id: "session_id",
      accuracy: "accuracy",
      heart_rate: "vitalsMap.vitals.heart_rate",
      systolic: "vitalsMap.vitals.bp_sys",
      diastolic: "vitalsMap.vitals.bp_dia",
      BMI: "bodyCompositionData.BMI",
      gender: "gender",
      height: "height",
      weight: "weight",
      resting_hr: "vitalsMap.vitals.resting_hr",
      max_hr: "vitalsMap.metadata.heart_scores.HRMax",
      stress_level: "vitalsMap.metadata.heart_scores.stress_index",
      vo2_max: "vitalsMap.metadata.physiological_scores.vo2max",
      endurance_score: "vitalsMap.metadata.physiological_scores.endurance_score",
      posture: "vitalsMap.posture"
    },
    classifications: {
      BMI: [
        { min: 0, max: 18.4, label: "Underweight" },
        { min: 18.5, max: 24.9, label: "Normal" },
        { min: 25, max: 29.9, label: "Overweight" },
        { min: 30, max: Infinity, label: "Obese" },
      ],
      heart_rate: [
        { min: 0, max: 59, label: "Below Normal" },
        { min: 60, max: 100, label: "Normal" },
        { min: 101, max: Infinity, label: "High" },
      ],
      systolic: [
        { min: 0, max: 119, label: "Normal" },
        { min: 120, max: 139, label: "Elevated" },
        { min: 140, max: Infinity, label: "High" },
      ],
      diastolic: [
        { min: 0, max: 79, label: "Normal" },
        { min: 80, max: 89, label: "Elevated" },
        { min: 90, max: Infinity, label: "High" },
      ],
    },
  },

  as_card_01: {
    sections: ["Key Body Vitals", "Cardiovascular Endurance", "Body Composition"],
    fields: {
      session_id: "session_id",
      accuracy: "accuracy",
      heart_rate: "vitalsMap.vitals.heart_rate",
      systolic: "vitalsMap.vitals.bp_sys",
      diastolic: "vitalsMap.vitals.bp_dia",
      BMI: "bodyCompositionData.BMI",
      gender: "gender",
      height: "height",
      weight: "weight",
      vo2_max: "vitalsMap.metadata.physiological_scores.vo2max",
      endurance_score: "vitalsMap.metadata.physiological_scores.endurance_score"
    },
    classifications: {
      BMI: [
        { min: 0, max: 18.4, label: "Underweight" },
        { min: 18.5, max: 24.9, label: "Normal" },
        { min: 25, max: 29.9, label: "Overweight" },
        { min: 30, max: Infinity, label: "Obese" },
      ],
      heart_rate: [
        { min: 0, max: 59, label: "Below Normal" },
        { min: 60, max: 100, label: "Normal" },
        { min: 101, max: Infinity, label: "High" },
      ],
    },
  },
};
