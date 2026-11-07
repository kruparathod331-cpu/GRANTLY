/**
 * GRANTLY Smart Scholarship Matching Engine
 * Compares student profile parameters against scholarship criteria.
 * Generates an indicative match score and a transparent "Why This Match?" breakdown.
 * Designed by Krupa Rathod for GRANTLY.
 */

export const calculateScholarshipMatch = (studentProfile, scholarship) => {
  // If no student profile is provided, return default neutral score
  if (!studentProfile || Object.keys(studentProfile).length === 0) {
    return {
      score: 70,
      label: 'Strong Profile Match',
      badgeColor: 'emerald',
      reasons: ['Baseline match calculated on default student criteria.'],
      missingInfo: ['Complete your profile to see tailored matching metrics.'],
      satisfiedCriteria: ['General student eligibility'],
      unmetCriteria: [],
      nextAction: 'Complete onboarding to personalize your score.',
      isIndicative: true
    };
  }

  let totalWeight = 0;
  let earnedScore = 0;
  const satisfiedCriteria = [];
  const unmetCriteria = [];
  const missingInfo = [];
  const reasons = [];

  // 1. Education Level (Weight: 25)
  totalWeight += 25;
  if (!studentProfile.degreeLevel) {
    missingInfo.push('Degree level is not specified in your profile.');
    earnedScore += 12; // partial credit
  } else if (
    scholarship.educationLevel === 'All' ||
    scholarship.educationLevel.toLowerCase() === studentProfile.degreeLevel.toLowerCase()
  ) {
    earnedScore += 25;
    satisfiedCriteria.push(`Education level matches (${scholarship.educationLevel})`);
    reasons.push(`Your enrolled level matches the required ${scholarship.educationLevel} category.`);
  } else {
    unmetCriteria.push(`Requires ${scholarship.educationLevel}, your profile indicates ${studentProfile.degreeLevel}.`);
  }

  // 2. Academic Performance / Percentage (Weight: 25)
  totalWeight += 25;
  const studentPct = parseFloat(studentProfile.percentage || studentProfile.gpaPercentage || 0);
  if (!studentPct) {
    missingInfo.push('Academic percentage or CGPA is missing from your profile.');
    earnedScore += 12;
  } else if (studentPct >= scholarship.minPercentage) {
    earnedScore += 25;
    satisfiedCriteria.push(`Academic score of ${studentPct}% exceeds minimum ${scholarship.minPercentage}%`);
    reasons.push(`Your academic performance (${studentPct}%) satisfies the minimum threshold of ${scholarship.minPercentage}%.`);
  } else {
    unmetCriteria.push(`Minimum ${scholarship.minPercentage}% required, current score is ${studentPct}%.`);
  }

  // 3. Course / Field of Study (Weight: 25)
  totalWeight += 25;
  const studentCourse = (studentProfile.course || '').toLowerCase();
  const eligibleCoursesLower = (scholarship.eligibleCourses || []).map(c => c.toLowerCase());
  const isAllCourses = eligibleCoursesLower.includes('all courses') || eligibleCoursesLower.includes('all streams');

  if (!studentCourse) {
    missingInfo.push('Field of study / course is not selected.');
    earnedScore += 10;
  } else if (
    isAllCourses ||
    eligibleCoursesLower.some(c => studentCourse.includes(c) || c.includes(studentCourse))
  ) {
    earnedScore += 25;
    satisfiedCriteria.push(`Course (${studentProfile.course}) is eligible for this opportunity`);
    reasons.push(`Your course (${studentProfile.course}) is accepted by this scholarship.`);
  } else {
    // If not direct match, check category relevance
    if (scholarship.category === 'STEM' && (studentCourse.includes('tech') || studentCourse.includes('science') || studentCourse.includes('eng'))) {
      earnedScore += 20;
      satisfiedCriteria.push(`Course recognized under broader STEM eligibility`);
    } else {
      unmetCriteria.push(`Specific course criteria may not align with ${studentProfile.course}.`);
      earnedScore += 5; // slight tolerance
    }
  }

  // 4. Family Income (Weight: 25)
  totalWeight += 25;
  const studentIncome = parseInt(studentProfile.annualIncome || 0, 10);
  if (!studentIncome) {
    missingInfo.push('Annual family household income is not provided.');
    earnedScore += 12;
  } else if (!scholarship.maxAnnualIncome || studentIncome <= scholarship.maxAnnualIncome) {
    earnedScore += 25;
    satisfiedCriteria.push(`Household income is within the ceiling (₹${(scholarship.maxAnnualIncome / 100000).toFixed(1)}L max)`);
    reasons.push(`Your family income complies with the stated income ceiling.`);
  } else {
    unmetCriteria.push(`Annual income ceiling of ₹${(scholarship.maxAnnualIncome / 100000).toFixed(1)}L exceeded.`);
  }

  // Final Percentage Score
  const finalPercentage = Math.min(100, Math.max(15, Math.round((earnedScore / totalWeight) * 100)));

  // Label designation
  let label = 'Strong Profile Match';
  let badgeColor = 'emerald';
  let nextAction = 'Ready to prepare documents and review application timeline.';

  if (finalPercentage >= 80) {
    label = 'Strong Profile Match';
    badgeColor = 'emerald';
    nextAction = 'Start preparing your statement of purpose and verified transcripts.';
  } else if (finalPercentage >= 60) {
    label = 'Potential Match';
    badgeColor = 'indigo';
    nextAction = 'Review specific eligibility clauses to confirm if waiver conditions apply.';
  } else if (finalPercentage >= 40) {
    label = 'Needs More Information';
    badgeColor = 'amber';
    nextAction = 'Update your academic score and income certificate status in profile.';
  } else {
    label = 'Appears Ineligible';
    badgeColor = 'rose';
    nextAction = 'Explore alternative scholarships with flexible income or stream requirements.';
  }

  return {
    score: finalPercentage,
    label,
    badgeColor,
    reasons: reasons.length > 0 ? reasons : ['General student eligibility indicators analyzed.'],
    satisfiedCriteria,
    unmetCriteria,
    missingInfo,
    nextAction,
    isIndicative: true,
    disclaimer: 'This score is an indicative demo calculation based on profile data, not an official eligibility decision. Review full terms before applying.'
  };
};
