/**
 * GRANTLY Learn — YouTube Educational Hub Data
 * Curated high-impact, verified public educational content on scholarship strategy,
 * SOP writing, interview skills, resume building, and international funding.
 */

export const LEARNING_CATEGORIES = [
  'All Guides',
  'Scholarship Application Guides',
  'SOP and Essay Writing',
  'Resume and CV Building',
  'Interview Preparation',
  'Financial Aid Explained',
  'Document Preparation',
  'Study Abroad Scholarships'
];

export const LEARNING_COLLECTIONS = [
  {
    id: 'col-starter',
    title: 'Scholarship Starter Pack',
    description: 'Essential fundamentals for first-time applicants navigating funding opportunities.',
    icon: 'GraduationCap',
    videoCount: 3,
  },
  {
    id: 'col-sop',
    title: 'Winning SOP Masterclass',
    description: 'Learn the exact narrative techniques that make admissions and scholarship juries take notice.',
    icon: 'PenTool',
    videoCount: 2,
  },
  {
    id: 'col-interview',
    title: 'Interview Masterclass',
    description: 'Master behavioral questions, technical presentations, and executive presence.',
    icon: 'MessageSquare',
    videoCount: 2,
  },
  {
    id: 'col-abroad',
    title: 'Study Abroad Preparation',
    description: 'Step-by-step navigation of global fellowships, university waivers, and visa documents.',
    icon: 'Globe',
    videoCount: 2,
  },
  {
    id: 'col-aid',
    title: 'Financial Aid Fundamentals',
    description: 'Demystifying need-based vs merit-based aid, tax certificates, and income documentation.',
    icon: 'Coins',
    videoCount: 2,
  }
];

export const LEARNING_VIDEOS = [
  {
    id: 'vid-01',
    youtubeId: 'b_0u_gU9L_M',
    title: 'How to Write a Powerful Scholarship Essay & Personal Statement',
    channelName: 'College Admissions Experts',
    duration: '14:22',
    category: 'SOP and Essay Writing',
    collections: ['col-starter', 'col-sop'],
    description: 'Deconstruct real winning personal statements. Learn the "Hook, Challenge, Resolution, Vision" four-part structure that stands out in competitive review rounds.',
    views: '320K views',
    level: 'Beginner to Intermediate',
    takeaways: [
      'Avoid generic platitudes in the opening sentence.',
      'Show, do not just tell: anchor goals to tangible projects.',
      'Connect personal financial context to future societal contribution.'
    ]
  },
  {
    id: 'vid-02',
    youtubeId: '1mHjMNZZvFo',
    title: 'Top 7 Scholarship & Fellowship Interview Questions (With High-Scoring Answers)',
    channelName: 'CareerVidz',
    duration: '12:45',
    category: 'Interview Preparation',
    collections: ['col-starter', 'col-interview'],
    description: 'Richard McMunn breaks down the most common scholarship committee questions, including "Tell us about yourself", "Why do you deserve this award?", and "How will you utilize these funds?".',
    views: '1.2M views',
    level: 'All Levels',
    takeaways: [
      'The STAR method for behavioral questions.',
      'How to explain financial need with dignity and clarity.',
      'Questions you should always ask the panel at the end.'
    ]
  },
  {
    id: 'vid-03',
    youtubeId: 'VvQ_3_wO5y0',
    title: 'Understanding Financial Aid, Grants & Scholarships Explained Simply',
    channelName: 'CrashCourse',
    duration: '10:18',
    category: 'Financial Aid Explained',
    collections: ['col-starter', 'col-aid'],
    description: 'Hank Green guides you through the complex maze of educational financing: the difference between need-based grants, merit scholarships, and subsidized student loans.',
    views: '540K views',
    level: 'Beginner',
    takeaways: [
      'The critical difference between grants and repayable loans.',
      'How Expected Family Contribution (EFC) and income tiers are computed.',
      'Why early submission increases funding probability.'
    ]
  },
  {
    id: 'vid-04',
    youtubeId: 'uG2aEh5xBJE',
    title: 'How to Build an Impressive Student Resume with Zero Formal Experience',
    channelName: 'Ken Jee',
    duration: '16:05',
    category: 'Resume and CV Building',
    collections: ['col-starter'],
    description: 'Transform classroom projects, hackathons, open-source commits, and club activities into high-impact bullet points using the Google X-Y-Z formula.',
    views: '890K views',
    level: 'Undergraduate',
    takeaways: [
      'Using the Google XYZ formula: Accomplished [X] as measured by [Y] by doing [Z].',
      'Formatting for Applicant Tracking Systems (ATS) and human screeners.',
      'Highlighting technical competencies cleanly.'
    ]
  },
  {
    id: 'vid-05',
    youtubeId: 'Tt08KmFfIYQ',
    title: 'How to Find & Win Full-Ride Scholarships for International Studies',
    channelName: 'TED-Ed Student Voices',
    duration: '11:32',
    category: 'Study Abroad Scholarships',
    collections: ['col-abroad'],
    description: 'A comprehensive playbook on discovering bilateral cultural agreements, government-funded overseas grants (Erasmus+, Chevening, Fulbright), and university fee remissions.',
    views: '410K views',
    level: 'Advanced',
    takeaways: [
      'Navigating university merit vs department research assistantships.',
      'Understanding cost of living calculations vs tuition waivers.',
      'Timeline milestones 12 months before university matriculation.'
    ]
  },
  {
    id: 'vid-06',
    youtubeId: '7_aA4n4_7g8',
    title: 'Document Checklist & Verification: Avoiding Immediate Rejection',
    channelName: 'Student Success Hub',
    duration: '09:50',
    category: 'Document Preparation',
    collections: ['col-aid', 'col-starter'],
    description: 'Discover the top 5 document errors that disqualify applicants before human review: wrong income authority signatures, mislabeled transcripts, and blurry identity proofs.',
    views: '180K views',
    level: 'Beginner',
    takeaways: [
      'Official Revenue Department seal requirements on Income Certificates.',
      'Requesting sealed or digitally verified academic transcripts.',
      'Proper PDF naming conventions for application attachments.'
    ]
  },
  {
    id: 'vid-07',
    youtubeId: 'p8k9L80kE8s',
    title: 'How to Ask Professors for Outstanding Recommendation Letters (LOR)',
    channelName: 'Grad School Insights',
    duration: '13:10',
    category: 'Scholarship Application Guides',
    collections: ['col-sop', 'col-starter'],
    description: 'Step-by-step email templates and etiquette for requesting enthusiastic, detail-rich reference letters from busy professors and mentors well in advance.',
    views: '290K views',
    level: 'Intermediate',
    takeaways: [
      'Providing an organized "Brag Sheet" with dates and projects.',
      'Giving recommenders a comfortable 4-6 week lead time.',
      'Polite follow-up timelines without seeming pushy.'
    ]
  },
  {
    id: 'vid-08',
    youtubeId: 'w-7LQgXl8bE',
    title: 'Study Abroad: Step-by-Step Financial Strategy for Overseas Masters',
    channelName: 'Global Education Forum',
    duration: '18:40',
    category: 'Study Abroad Scholarships',
    collections: ['col-abroad'],
    description: 'How to calculate your true proof-of-funds requirement, assemble block accounts, and pitch external foundations for sponsorship.',
    views: '350K views',
    level: 'Postgraduate',
    takeaways: [
      'Calculating 24-month financial runway.',
      'External trusts vs institutional scholarships.',
      'Tax clearances and currency transfer regulations.'
    ]
  }
];
