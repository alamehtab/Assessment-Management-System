module.exports = {
  as_hr_02: {
    sections: [
      'Key Body Vitals',
      'Heart Health',
      'Stress Level',
      'Fitness Levels',
      'Posture',
      'Body Composition'
    ],
    fields: {
      session_id: 'session_id',
      accuracy: 'accuracy',
      heart_rate: 'vitalsMap.vitals.heart_rate',
      systolic: 'vitalsMap.vitals.bp_sys',
      diastolic: 'vitalsMap.vitals.bp_dia',
      BMI: 'bodyCompositionData.BMI',
      gender: 'gender',
      height: 'height',
      weight: 'weight',

      resting_hr: 'vitalsMap.vitals.resting_hr',
      max_hr: 'vitalsMap.metadata.heart_scores.HRMax',
      stress_level: 'vitalsMap.metadata.heart_scores.stress_index',
      vo2_max: 'vitalsMap.metadata.physiological_scores.vo2max',
      endurance_score: 'vitalsMap.metadata.physiological_scores.endurance_score',
      posture: 'vitalsMap.posture'
    }
  },

  as_card_01: {
    sections: [
      'Key Body Vitals',
      'Cardiovascular Endurance',
      'Body Composition'
    ],
    fields: {
      session_id: 'session_id',
      accuracy: 'accuracy',
      heart_rate: 'vitalsMap.vitals.heart_rate',
      systolic: 'vitalsMap.vitals.bp_sys',
      diastolic: 'vitalsMap.vitals.bp_dia',
      BMI: 'bodyCompositionData.BMI',
      gender: 'gender',
      height: 'height',
      weight: 'weight',

      vo2_max: 'vitalsMap.metadata.physiological_scores.vo2max',
      endurance_score: 'vitalsMap.metadata.physiological_scores.endurance_score'
    }
  }
};
