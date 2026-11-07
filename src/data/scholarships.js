/**
 * GRANTLY Scholarship Catalog — High-Fidelity DEMO DATA
 * All records are fictional demo opportunities curated for testing and demonstration.
 * Designed & Developed by Krupa Rathod for THE OUTPOST Hackathon.
 */

export const SCHOLARSHIPS_DATA = [
  {
    id: 'sch-01',
    title: 'Aditi Empower STEM Fellowship for Women',
    provider: 'Aditi Foundation for Tech Leadership',
    amount: 250000,
    formattedAmount: '₹2,50,000 / year',
    category: 'Women in STEM',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Computer Science', 'Information Technology', 'Data Science', 'Electrical Engineering', 'Mechanical Engineering'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 75,
    maxAnnualIncome: 600000,
    deadline: '2026-11-28',
    urgency: 'high',
    featured: true,
    isDemoData: true,
    summary: 'Merit-cum-need fellowship empowering promising female engineers and computer scientists with tuition support and 1-on-1 industry mentorship.',
    overview: 'The Aditi Empower STEM Fellowship was conceptualized to close the gender gap in technical leadership across India. Selected fellows receive financial support for tuition and learning resources, alongside a dedicated senior mentor from top tech firms.',
    eligibilityCriteria: [
      'Self-identifying female student enrolled full-time in B.Tech / B.E. / B.Sc Computer Science / IT / AI & ML.',
      'Minimum aggregate academic score of 75% or 7.5 CGPA in class 12 and ongoing semesters.',
      'Annual family household income not exceeding ₹6,00,000 from all sources.',
      'Open to 1st, 2nd, and 3rd-year undergraduate students across accredited Indian colleges.'
    ],
    requiredDocuments: [
      'Resume/CV (Updated)',
      '10th and 12th Mark sheets',
      'Semester Grade Cards / Academic Transcripts',
      'Family Income Certificate (Tehsildar issued)',
      'Statement of Purpose (SOP - 500 words)',
      'College Bonafide Certificate & Student ID'
    ],
    applicationSteps: [
      'Complete your student profile and link required academic transcripts.',
      'Draft a Statement of Purpose focusing on your engineering vision and community impact.',
      'Submit the preliminary digital application before the November deadline.',
      'Shortlisted candidates participate in a virtual technical & leadership conversation.',
      'Final award disbursement directly to the affiliated college account.'
    ],
    timeline: [
      { date: '2026-10-15', event: 'Applications Opened' },
      { date: '2026-11-28', event: 'Final Application Deadline' },
      { date: '2026-12-15', event: 'Shortlist Announcement & Verification' },
      { date: '2027-01-10', event: 'Virtual Interview Rounds' },
      { date: '2027-01-25', event: 'Fellowship Disbursement' }
    ],
    tags: ['Women in Tech', 'Engineering', 'Mentorship', 'Merit-Need']
  },
  {
    id: 'sch-02',
    title: 'Bharat NextGen Innovators Grant',
    provider: 'National Innovation & Research Trust',
    amount: 180000,
    formattedAmount: '₹1,80,000 (One-time)',
    category: 'STEM',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Computer Science', 'Electronics & Comm', 'Mechanical Engineering', 'Biotechnology', 'Aerospace Engineering'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 80,
    maxAnnualIncome: 800000,
    deadline: '2026-12-05',
    urgency: 'medium',
    featured: true,
    isDemoData: true,
    summary: 'Prestigious grant supporting student builders solving indigenous challenges in deep-tech, clean energy, agriculture, and healthcare robotics.',
    overview: 'Bharat NextGen Innovators Grant identifies self-driven undergraduate builders who have demonstrated prototype building, research papers, or hackathon achievements that address grassroots Indian challenges.',
    eligibilityCriteria: [
      'Currently enrolled undergraduate student in any recognized engineering discipline.',
      'Minimum 80% aggregate in 10+2 or equivalent examination.',
      'Submission of a working prototype, software repository, or documented research proposal.',
      'Family income under ₹8,00,000 per annum.'
    ],
    requiredDocuments: [
      'Project Pitch Deck or Video Demo link',
      'Resume/CV',
      'Academic Transcripts (College/Board)',
      'Letter of Recommendation from Faculty Advisor',
      'Identity Proof (Aadhaar / Passport)'
    ],
    applicationSteps: [
      'Submit brief project summary and repository/demo links.',
      'Provide academic transcripts and faculty endorsement letter.',
      'Review by National Innovation Panel in early December.',
      'Live 10-minute prototype demonstration for final 50 finalists.'
    ],
    timeline: [
      { date: '2026-11-01', event: 'Portals Live' },
      { date: '2026-12-05', event: 'Submission Closes' },
      { date: '2026-12-20', event: 'Prototype Demo Days' },
      { date: '2027-01-05', event: 'Grant Announcement' }
    ],
    tags: ['Innovation', 'Hackathons', 'DeepTech', 'Merit-Based']
  },
  {
    id: 'sch-03',
    title: 'Pragati Shiksha Need-Based Scholarship',
    provider: 'Pragati Social Welfare Alliance',
    amount: 120000,
    formattedAmount: '₹1,20,000 / year',
    category: 'Need-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['All Courses', 'Arts', 'Commerce', 'Science', 'Engineering', 'Law', 'Medicine'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 65,
    maxAnnualIncome: 350000,
    deadline: '2026-11-20',
    urgency: 'high',
    featured: true,
    isDemoData: true,
    summary: 'Comprehensive financial aid protecting high-potential students from vulnerable economic households against college dropouts.',
    overview: 'Pragati Shiksha is designed for resilient students facing extreme financial distress, supporting tuition fees, hostel expenses, and examination costs throughout undergraduate studies.',
    eligibilityCriteria: [
      'Enrolled in 1st or 2nd year of an accredited 3 or 4-year undergraduate degree.',
      'Total annual family income must be strictly less than ₹3,50,000 per annum.',
      'Minimum passing grade of 65% in 12th standard or preceding college semesters.',
      'First-generation college students receive dedicated selection weightage.'
    ],
    requiredDocuments: [
      'Income Certificate issued by competent Revenue Authority (SDM/Tehsildar)',
      'Ration Card / BPL Card (if applicable)',
      'College Fee Receipt & Bonafide Letter',
      '10th and 12th Marksheets',
      'Personal Hardship Statement (300 words)'
    ],
    applicationSteps: [
      'Fill out household economic questionnaire with income proofs.',
      'Upload genuine fee structures and university enrollment details.',
      'Telephonic community verification by Pragati social workers.',
      'Direct grant transfer to university account.'
    ],
    timeline: [
      { date: '2026-09-15', event: 'Cycle Announced' },
      { date: '2026-11-20', event: 'Deadline for Income Uploads' },
      { date: '2026-12-10', event: 'Verification Review' },
      { date: '2026-12-28', event: 'Beneficiary List Published' }
    ],
    tags: ['Need-Based', 'First-Gen', 'Tuition Aid', 'All Streams']
  },
  {
    id: 'sch-04',
    title: 'Dr. APJ Abdul Kalam Academic Excellence Award',
    provider: 'National Council for Academic Excellence',
    amount: 300000,
    formattedAmount: '₹3,00,000 (Full Academic Year)',
    category: 'Merit-based',
    educationLevel: 'Postgraduate',
    eligibleCourses: ['Computer Science', 'Artificial Intelligence', 'Physics', 'Mathematics', 'Robotics', 'Aerospace'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 85,
    maxAnnualIncome: 1200000,
    deadline: '2026-12-15',
    urgency: 'medium',
    featured: true,
    isDemoData: true,
    summary: 'Top-tier merit award honoring postgraduate and research scholars with stellar academic and scientific publications record.',
    overview: 'Commemorating the vision of Dr. Kalam, this flagship award recognizes postgraduate scholars pursuing cutting-edge frontiers in computational sciences, mathematics, and aerospace engineering.',
    eligibilityCriteria: [
      'Currently enrolled in M.Tech, M.S. (Research), or M.Sc in affiliated central or state universities.',
      'Consistent academic excellence: minimum 85% or 8.5 CGPA in Bachelor degree and 10+2.',
      'Published at least one peer-reviewed conference paper or demonstrated patent filing.',
      'Indian citizenship.'
    ],
    requiredDocuments: [
      'Comprehensive Curriculum Vitae (CV)',
      'Bachelors Degree Certificate & All Semester Transcripts',
      'Copies of Published Research Papers or Project Demos',
      'Two Academic Letters of Recommendation (HoD / Research Guide)',
      'Research Proposal (1,000 words)'
    ],
    applicationSteps: [
      'Register with institutional research ID and advisor details.',
      'Submit research proposal and academic credentials.',
      'Blind peer review by Academic Standing Committee.',
      'Oral presentation to national scientific jury.'
    ],
    timeline: [
      { date: '2026-10-01', event: 'Research Call Open' },
      { date: '2026-12-15', event: 'Application Submission Deadline' },
      { date: '2027-01-20', event: 'Peer Review Outcome' },
      { date: '2027-02-10', event: 'Kalam Memorial Awards Day' }
    ],
    tags: ['Postgraduate', 'Research', 'Merit', 'Publications']
  },
  {
    id: 'sch-05',
    title: 'Global Scholar Fellowship for Study Abroad',
    provider: 'Global Horizons International Foundation',
    amount: 1000000,
    formattedAmount: '₹10,00,000 (Travel & Living)',
    category: 'Study Abroad',
    educationLevel: 'Postgraduate',
    eligibleCourses: ['Computer Science', 'Data Analytics', 'Public Policy', 'Environmental Sciences', 'Bioinformatics', 'Business'],
    location: 'International / Study Abroad',
    eligibleStates: ['All India'],
    minPercentage: 78,
    maxAnnualIncome: 1500000,
    deadline: '2026-12-30',
    urgency: 'low',
    featured: true,
    isDemoData: true,
    summary: 'Substantial travel and living grant for outstanding Indian students admitted to top 100 global universities abroad.',
    overview: 'The Global Scholar Fellowship offsets the steep initial costs of overseas education, including visa fees, health insurance, airfare, and first-semester accommodation at QS Top 100 universities.',
    eligibilityCriteria: [
      'Valid unconditional offer letter from an overseas university ranked in QS Top 100.',
      'Undergraduate CGPA of at least 7.8/10 or 78% aggregate.',
      'Valid English proficiency test scores (IELTS 7.0+ or TOEFL 95+).',
      'Commitment to contribute to student knowledge exchange initiatives.'
    ],
    requiredDocuments: [
      'University Official Offer Letter & I-20 / CAS document',
      'IELTS / TOEFL Score Card',
      'Statement of Purpose (Overseas Study Objectives)',
      'Complete Bachelor Degree Transcripts',
      'Passport Copy (Valid for at least 2 years)',
      'Estimated Cost of Living Worksheet'
    ],
    applicationSteps: [
      'Upload verified university offer letter and test scores.',
      'Submit detailed study motivation and financial need breakdown.',
      'Global selection interview with alumni scholars.',
      'Pre-departure orientation and grant clearance.'
    ],
    timeline: [
      { date: '2026-10-20', event: 'Round 1 Opened' },
      { date: '2026-12-30', event: 'Application Cut-off' },
      { date: '2027-01-30', event: 'Global Interview Rounds' },
      { date: '2027-02-25', event: 'Grant Allocation' }
    ],
    tags: ['Study Abroad', 'International', 'QS Top 100', 'Postgraduate']
  },
  {
    id: 'sch-06',
    title: 'Kavita Devi Memorial Rural Scholars Grant',
    provider: 'Rural Upliftment & Educational Society',
    amount: 90000,
    formattedAmount: '₹90,000 / year',
    category: 'Need-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Agriculture', 'Civil Engineering', 'Nursing', 'Education', 'Commerce', 'Computer Science'],
    location: 'Tier 2, Tier 3 & Rural Districts',
    eligibleStates: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan', 'Odisha', 'All India'],
    minPercentage: 60,
    maxAnnualIncome: 300000,
    deadline: '2026-11-25',
    urgency: 'high',
    featured: false,
    isDemoData: true,
    summary: 'Targeted support for resilient students originating from rural talukas and agricultural families transitioning into tertiary education.',
    overview: 'Designed to break generational poverty by ensuring bright village youths can complete professional degrees in state universities without taking high-interest informal loans.',
    eligibilityCriteria: [
      'Passed 10th and 12th standard schooling from a rural or government school.',
      'Parental occupation primarily agricultural labour, small farming, or artisanal trades.',
      'Family annual income under ₹3,00,000.',
      'Minimum 60% in 12th board exams.'
    ],
    requiredDocuments: [
      'Rural Residence Certificate (Domicile)',
      '10th and 12th Marksheets from rural institution',
      'Income Certificate & Landholding documentation (if farming)',
      'College Admission Fee Voucher',
      'Aadhaar Card'
    ],
    applicationSteps: [
      'Submit school proofs and domicile certificate.',
      'Provide local Sarpanch or Gram Panchayat verification endorsement.',
      'District coordinator evaluation.',
      'Direct disbursement to bank account with scholarship passbook.'
    ],
    timeline: [
      { date: '2026-09-01', event: 'Village Campaign Rollout' },
      { date: '2026-11-25', event: 'Document Portal Closes' },
      { date: '2026-12-18', event: 'District Committee Scrutiny' },
      { date: '2027-01-08', event: 'Direct Benefit Transfer' }
    ],
    tags: ['Rural', 'First-Gen', 'Grassroots', 'Need-Based']
  },
  {
    id: 'sch-07',
    title: 'CodeCraft Future Software Architects Scholarship',
    provider: 'OpenTech Developers Consortium',
    amount: 150000,
    formattedAmount: '₹1,50,000 + Tech Setup',
    category: 'Computer Science',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Computer Science', 'Software Engineering', 'Information Science', 'Data Engineering'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 70,
    maxAnnualIncome: 750000,
    deadline: '2026-12-10',
    urgency: 'medium',
    featured: true,
    isDemoData: true,
    summary: 'Includes direct educational stipend plus high-spec laptop and cloud credits for students excelling in open-source development.',
    overview: 'CodeCraft supports passionate software creators who contribute to public open-source libraries, build dev tools, or ship practical web & mobile utilities for communities.',
    eligibilityCriteria: [
      'Active GitHub / GitLab profile with genuine project commits and open-source contributions.',
      'Undergraduate student in CS, IT, or related computing field.',
      'Demonstrated understanding of modern frameworks (React, Python, Go, Rust, or Node).',
      'Minimum 70% in college coursework.'
    ],
    requiredDocuments: [
      'GitHub Profile Link & Notable Pull Request / Repo highlights',
      'Resume/CV with Project descriptions',
      'College Transcripts',
      'Short writeup on an open-source tool you admire and why (300 words)'
    ],
    applicationSteps: [
      'Connect GitHub handle and showcase key repositories.',
      'Automated code quality & commit history review.',
      'Short coding dialogue with open-source maintainers.',
      'Stipend release and developer equipment kit dispatch.'
    ],
    timeline: [
      { date: '2026-10-10', event: 'Applications Open' },
      { date: '2026-12-10', event: 'Repo Submissions Close' },
      { date: '2026-12-24', event: 'Maintainer Review Results' },
      { date: '2027-01-15', event: 'Kit & Fund Distribution' }
    ],
    tags: ['Open Source', 'GitHub', 'Web Development', 'Computer Science']
  },
  {
    id: 'sch-08',
    title: 'Triveni Cultural & Creative Arts Fellowship',
    provider: 'Triveni Heritage Foundation',
    amount: 140000,
    formattedAmount: '₹1,40,000 / year',
    category: 'Arts & Design',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Design', 'Fine Arts', 'Animation & VFX', 'Visual Arts', 'Architecture', 'Mass Communication'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 65,
    maxAnnualIncome: 700000,
    deadline: '2026-12-22',
    urgency: 'low',
    featured: false,
    isDemoData: true,
    summary: 'Encouraging visionary young designers, visual storytellers, and cultural preservationists studying creative disciplines.',
    overview: 'Recognizing that creative students often face limited traditional scholarship avenues, Triveni supports design and fine arts students through studio grants and exhibition sponsorship.',
    eligibilityCriteria: [
      'Enrolled in B.Des, BFA, B.Arch, or certified vocational design diplomas.',
      'Digital portfolio demonstrating creative prowess, traditional arts, or digital design.',
      'Academic aggregate of at least 65% in 12th standard.',
      'Family income not exceeding ₹7,00,000 per annum.'
    ],
    requiredDocuments: [
      'Creative Design Portfolio (PDF or Behance/Dribbble/Website link)',
      'Artist Statement & Inspiration Essay (400 words)',
      'College Enrollment Certificate',
      'Income Certificate',
      'Academic Record Cards'
    ],
    applicationSteps: [
      'Submit curated portfolio of 5 to 8 original works.',
      'Jury evaluation by leading design educators and artists.',
      'Virtual showcase round for shortlisted applicants.',
      'Studio grant release.'
    ],
    timeline: [
      { date: '2026-11-05', event: 'Portfolio Portal Open' },
      { date: '2026-12-22', event: 'Final Submission Date' },
      { date: '2027-01-18', event: 'Exhibition Shortlist' },
      { date: '2027-02-05', event: 'Award Presentation' }
    ],
    tags: ['Design', 'Arts', 'Portfolio', 'Creative']
  },
  {
    id: 'sch-09',
    title: 'Sardar Patel Public Leadership Scholarship',
    provider: 'Sardar Patel Memorial Trust',
    amount: 200000,
    formattedAmount: '₹2,00,000 / year',
    category: 'Merit-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Political Science', 'Economics', 'Law (LL.B / B.A. LL.B)', 'Sociology', 'Public Administration'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 80,
    maxAnnualIncome: 900000,
    deadline: '2026-12-18',
    urgency: 'medium',
    featured: false,
    isDemoData: true,
    summary: 'Nurturing future civil servants, public policy researchers, and constitutional law advocates with merit-based funding.',
    overview: 'A premier scholarship aimed at bright students studying governance, jurisprudence, and developmental economics who aspire to serve the nation through administrative and legal channels.',
    eligibilityCriteria: [
      'Full-time student enrolled in accredited Law (5-year or 3-year LL.B) or B.A. Economics / Political Science.',
      'Minimum 80% aggregate marks in 12th standard examinations.',
      'Documented leadership experience in student unions, youth parliaments, or legal aid clinics.',
      'Family income below ₹9,00,000.'
    ],
    requiredDocuments: [
      'Detailed Essay on Constitutional Governance or Economic Policy (750 words)',
      'College Transcripts and CLAT / Entrance Examination scorecard',
      'Certificate of extracurricular leadership (Debating, MUN, Moot Court)',
      'Income Verification Document'
    ],
    applicationSteps: [
      'Submit legal/policy essay and academic entrance credentials.',
      'Scrutiny by panel of retired judges and civil servants.',
      'Policy debate interview for top 30 candidates.',
      'Scholarship induction & annual stipend.'
    ],
    timeline: [
      { date: '2026-10-15', event: 'Essay Topic Released' },
      { date: '2026-12-18', event: 'Submission Window Closes' },
      { date: '2027-01-15', event: 'Debate Interviews' },
      { date: '2027-02-01', event: 'Awardees Announced' }
    ],
    tags: ['Law', 'Economics', 'Public Policy', 'Leadership']
  },
  {
    id: 'sch-10',
    title: 'Aryabhata Mathematical Sciences Fellowship',
    provider: 'Institute for Pure & Applied Mathematical Research',
    amount: 220000,
    formattedAmount: '₹2,20,000 / year',
    category: 'STEM',
    educationLevel: 'Postgraduate',
    eligibleCourses: ['Mathematics', 'Statistics', 'Data Analytics', 'Theoretical Computer Science', 'Actuarial Science'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 82,
    maxAnnualIncome: 1000000,
    deadline: '2027-01-15',
    urgency: 'low',
    featured: false,
    isDemoData: true,
    summary: 'Recognizing foundational excellence in quantitative analysis, discrete mathematics, cryptography, and stochastic modeling.',
    overview: 'The Aryabhata Fellowship champions pure and applied mathematicians in their master’s degrees, supporting coursework and conference travel for those advancing mathematical sciences.',
    eligibilityCriteria: [
      'Pursuing M.Sc or Integrated M.Sc in Mathematics, Statistics, or Applied Quant fields.',
      'Minimum 82% marks in B.Sc Mathematics / Statistics.',
      'Strong analytical reasoning record (e.g., IIT-JAM, NBHM qualification or university top 5% rank).',
      'Open to Indian nationals under 26 years of age.'
    ],
    requiredDocuments: [
      'B.Sc Degree Certificate and Semester Transcripts',
      'JAM / NBHM / GATE Scorecard (if available)',
      'Statement of Quantitative Research Interests',
      'Two Academic Recommendations from Mathematics Professors'
    ],
    applicationSteps: [
      'Submit undergraduate mathematical transcripts and standardized test records.',
      'Qualifying analytical test (online math reasoning module).',
      'Virtual interview with research mathematicians.',
      'Award confirmation and annual fellowship.'
    ],
    timeline: [
      { date: '2026-11-15', event: 'Application Portal Open' },
      { date: '2027-01-15', event: 'Application Deadline' },
      { date: '2027-02-05', event: 'Online Analytical Test' },
      { date: '2027-02-28', event: 'Final Fellowship List' }
    ],
    tags: ['Mathematics', 'Statistics', 'Postgraduate', 'STEM']
  },
  {
    id: 'sch-11',
    title: 'Green Future Clean Energy Research Grant',
    provider: 'EcoIndia Sustainable Energy Foundation',
    amount: 280000,
    formattedAmount: '₹2,80,000 / project',
    category: 'STEM',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['Chemical Engineering', 'Environmental Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Renewable Energy'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 72,
    maxAnnualIncome: 850000,
    deadline: '2026-12-08',
    urgency: 'medium',
    featured: true,
    isDemoData: true,
    summary: 'Funding innovative student engineering projects targeting solar efficiency, EV batteries, circular waste, and carbon capture.',
    overview: 'EcoIndia provides capital expenditure and lab resources to undergraduate engineering groups designing tangible cleantech prototypes that can be implemented in urban or rural India.',
    eligibilityCriteria: [
      'Team of 1 to 4 undergraduate engineering students in their 3rd or 4th year.',
      'Focus areas: Solar, Battery Chemistry, Biogas, Water Remediation, or Circular Economy.',
      'Institutional laboratory approval letter.',
      'Minimum average team CGPA of 7.2 or 72% aggregate.'
    ],
    requiredDocuments: [
      'Technical Project Proposal & Cost Budget (Max 5 pages)',
      'Endorsement Letter from Department Head / Lab In-Charge',
      'Resume/CV of all student project members',
      'Student ID Cards & Transcripts'
    ],
    applicationSteps: [
      'Lead student registers project abstract and bill of materials.',
      'Technical viability evaluation by CleanTech engineers.',
      'Live Q&A round on environmental impact and scalability.',
      'Grant disbursed in two milestone-based tranches.'
    ],
    timeline: [
      { date: '2026-10-25', event: 'Call for Proposals' },
      { date: '2026-12-08', event: 'Proposal Cut-off' },
      { date: '2026-12-28', event: 'Milestone 1 Approvals' },
      { date: '2027-01-20', event: 'Initial Grant Transfer' }
    ],
    tags: ['CleanTech', 'Renewable Energy', 'Engineering', 'Projects']
  },
  {
    id: 'sch-12',
    title: 'Vidyasagar First-Generation College Grant',
    provider: 'Vidyasagar Trust for Educational Equity',
    amount: 110000,
    formattedAmount: '₹1,10,000 / year',
    category: 'Need-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['All Courses', 'Commerce', 'Arts', 'Science', 'Vocational Degrees'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 62,
    maxAnnualIncome: 250000,
    deadline: '2026-11-22',
    urgency: 'high',
    featured: false,
    isDemoData: true,
    summary: 'Dedicated to students who are the very first in their entire extended family lineage to step into university education.',
    overview: 'First-generation students navigate unique academic and psychological hurdles. Vidyasagar provides financial cushions alongside peer counseling and English communication bootcamps.',
    eligibilityCriteria: [
      'Neither parent has earned a bachelor degree or professional diploma.',
      'Annual household income below ₹2,50,000.',
      'Enrolled in 1st year of any recognized degree program.',
      'Minimum 62% in 12th standard.'
    ],
    requiredDocuments: [
      'First-Generation College Student Self-Affidavit',
      'Family Income Certificate (Official Government Format)',
      '10th and 12th Marksheets',
      'College Admission Fee Slip',
      'Bank Account Passbook Front Page'
    ],
    applicationSteps: [
      'Upload signed first-gen declaration and family background form.',
      'Document review and income verification.',
      'Welcome interview & onboarding to student mentorship cohort.',
      'Annual fee coverage directly remitted.'
    ],
    timeline: [
      { date: '2026-09-20', event: 'Cohort Applications Open' },
      { date: '2026-11-22', event: 'Verification Deadline' },
      { date: '2026-12-12', event: 'Candidate Approval' },
      { date: '2026-12-30', event: 'Disbursement & Mentorship Kickoff' }
    ],
    tags: ['First-Gen', 'Need-Based', 'Equity', 'Undergraduate']
  },
  {
    id: 'sch-13',
    title: 'Sushruta Medical & Healthcare Scholarship',
    provider: 'National Healthcare Education Foundation',
    amount: 350000,
    formattedAmount: '₹3,50,000 / year',
    category: 'Need-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['MBBS', 'BDS', 'B.Sc Nursing', 'B.Pharm', 'Physiotherapy (BPT)'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 75,
    maxAnnualIncome: 650000,
    deadline: '2026-12-12',
    urgency: 'medium',
    featured: true,
    isDemoData: true,
    summary: 'Supporting dedicated medical and nursing students committed to serving in underserved district hospitals and primary health centers.',
    overview: 'Medical education in India carries high equipment and tuition expenses. The Sushruta scholarship alleviates this burden for medical students from modest backgrounds.',
    eligibilityCriteria: [
      'Enrolled in MBBS / BDS / B.Sc Nursing / B.Pharm in recognized government or government-quota private medical colleges.',
      'Qualified NEET-UG with competitive percentile.',
      'Family income not exceeding ₹6,50,000 per year.',
      'Willingness to undertake community rural healthcare internships.'
    ],
    requiredDocuments: [
      'NEET-UG Scorecard and Allotment Letter',
      'Medical College ID and Current Year Fee Receipt',
      'Income Certificate issued by Tehsildar',
      '10th & 12th PCB Marksheet',
      'Personal Commitment Essay on Rural Health (400 words)'
    ],
    applicationSteps: [
      'Submit NEET scorecards and medical college allotment proofs.',
      'Income and domicile verification.',
      'Clinical faculty committee review.',
      'Stipend release for books, diagnostic kits, and semester fees.'
    ],
    timeline: [
      { date: '2026-10-30', event: 'NEET Round Open' },
      { date: '2026-12-12', event: 'Applications Close' },
      { date: '2027-01-08', event: 'Merit Verification' },
      { date: '2027-01-28', event: 'Fund Distribution' }
    ],
    tags: ['Medical', 'MBBS', 'Nursing', 'NEET']
  },
  {
    id: 'sch-14',
    title: 'Horizon AI & Data Science Fellowship',
    provider: 'Horizon Foundation for Artificial Intelligence',
    amount: 260000,
    formattedAmount: '₹2,60,000 / year',
    category: 'Computer Science',
    educationLevel: 'Postgraduate',
    eligibleCourses: ['Artificial Intelligence', 'Data Science', 'Machine Learning', 'Computational Neuroscience', 'Robotics'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 80,
    maxAnnualIncome: 1200000,
    deadline: '2027-01-10',
    urgency: 'low',
    featured: true,
    isDemoData: true,
    summary: 'For master and doctoral scholars pioneering applied neural networks, multimodal AI, LLMs, and computer vision systems.',
    overview: 'Supports advanced graduate research in generative modeling, reinforcement learning, and computational linguistics, providing compute sponsorships alongside monetary fellowships.',
    eligibilityCriteria: [
      'Full-time student in M.Tech/M.S. in AI/ML, Data Science, or allied computing branches.',
      'Undergraduate CGPA of at least 8.0/10.',
      'Portfolio of ML projects with Kaggle / Hugging Face / GitHub verifiable links.',
      'Indian resident.'
    ],
    requiredDocuments: [
      'Curriculum Vitae highlighting ML models and repos',
      'Transcripts of Bachelor and ongoing Master studies',
      'Research Statement on AI safety or applied machine learning (600 words)',
      'Academic Reference Letter'
    ],
    applicationSteps: [
      'Submit code repositories and model weights references.',
      'Technical review of methodology and algorithmic depth.',
      'Presentation of ongoing thesis or research work.',
      'Fellowship grant and cloud compute allocations.'
    ],
    timeline: [
      { date: '2026-11-10', event: 'Applications Open' },
      { date: '2027-01-10', event: 'Submissions Close' },
      { date: '2027-02-01', event: 'Technical Presentation Days' },
      { date: '2027-02-20', event: 'Fellowship Award' }
    ],
    tags: ['AI/ML', 'Data Science', 'Postgraduate', 'Deep Learning']
  },
  {
    id: 'sch-15',
    title: 'Nalanda Global Humanities Fellowship',
    provider: 'Nalanda Council for Interdisciplinary Studies',
    amount: 175000,
    formattedAmount: '₹1,75,000 / year',
    category: 'Arts & Design',
    educationLevel: 'Postgraduate',
    eligibleCourses: ['History', 'Linguistics', 'Philosophy', 'Archaeology', 'Literature', 'Anthropology'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 70,
    maxAnnualIncome: 800000,
    deadline: '2027-01-20',
    urgency: 'low',
    featured: false,
    isDemoData: true,
    summary: 'Revitalizing historical, linguistic, and philosophical inquiry with archival research grants and fieldwork stipends.',
    overview: 'Named after the historic seat of learning, Nalanda Fellowship preserves classical scholarship, manuscript studies, and archaeological field expeditions for dedicated scholars.',
    eligibilityCriteria: [
      'Enrolled in M.A. or Ph.D in History, Archeology, Linguistics, or Philosophy.',
      'Minimum 70% in Bachelor of Arts.',
      'Documented archival or fieldwork research topic.',
      'Recommendation by university department head.'
    ],
    requiredDocuments: [
      'Detailed Fieldwork & Archival Research Proposal (1,200 words)',
      'Undergraduate and Postgraduate Grade Cards',
      'Writing Sample (Published essay or term paper)',
      'Two Letters of Recommendation'
    ],
    applicationSteps: [
      'Submit research outline and proposed archival sites.',
      'Evaluation by senior historians and philologists.',
      'Interview on historical methodology.',
      'Award disbursement.'
    ],
    timeline: [
      { date: '2026-11-20', event: 'Applications Live' },
      { date: '2027-01-20', event: 'Submissions Close' },
      { date: '2027-02-15', event: 'Oral Interviews' },
      { date: '2027-03-01', event: 'Fellowship Formalization' }
    ],
    tags: ['Humanities', 'History', 'Research', 'Postgraduate']
  },
  {
    id: 'sch-16',
    title: 'Udaan Sports & Academic Excellence Scholarship',
    provider: 'Udaan Youth Sports Foundation',
    amount: 200000,
    formattedAmount: '₹2,00,000 / year + Training',
    category: 'Merit-based',
    educationLevel: 'Undergraduate',
    eligibleCourses: ['All Courses', 'Physical Education', 'Sports Science', 'Commerce', 'Arts', 'Engineering'],
    location: 'All India',
    eligibleStates: ['All India'],
    minPercentage: 60,
    maxAnnualIncome: 950000,
    deadline: '2026-12-02',
    urgency: 'high',
    featured: false,
    isDemoData: true,
    summary: 'Empowering student athletes competing at national, inter-university, or state championships to balance elite sports and academic degrees.',
    overview: 'Covers specialized nutritional requirements, professional equipment, sports physiotherapy, and tuition fees so athletes do not have to abandon education for sports.',
    eligibilityCriteria: [
      'Representation of state, national, or accredited university in National Games or AIU competitions.',
      'Enrolled in any undergraduate degree program.',
      'Passing score of at least 60% in academic curriculum.',
      'Age between 17 and 24 years.'
    ],
    requiredDocuments: [
      'National / State Sports Participation Certificates & Medal Records',
      'Affiliation Letter from Sports Federation / College Sports Director',
      'Academic Mark Sheets',
      'Medical Fitness Certificate',
      'Photo ID'
    ],
    applicationSteps: [
      'Submit verified athletic performance records and academic proofs.',
      'Physical trials and fitness verification by panel.',
      'Board approval of sports stipend.',
      'Equipment grant and academic fee voucher issuance.'
    ],
    timeline: [
      { date: '2026-10-18', event: 'Trial Registrations Open' },
      { date: '2026-12-02', event: 'Sports Portal Closes' },
      { date: '2026-12-18', event: 'Athletic Verification' },
      { date: '2027-01-10', event: 'Award Presentation' }
    ],
    tags: ['Sports', 'Athletics', 'Merit', 'Undergraduate']
  }
];
