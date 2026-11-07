import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../services/storageService';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from '../services/matchingService';

const DEFAULT_PROFILE = {
  name: 'Aarav Patel',
  email: 'aarav.patel@student.edu.in',
  phone: '+91 98765 43210',
  country: 'India',
  state: 'Maharashtra',
  college: 'National Institute of Technology, Mumbai',
  degree: 'B.Tech',
  degreeLevel: 'Undergraduate',
  course: 'Computer Science',
  academicYear: '3rd Year',
  percentage: '84.5',
  annualIncome: '450000',
  interests: ['STEM', 'Computer Science', 'Merit-based', 'Innovation'],
  preferredLocation: 'All India & Global',
  isOnboarded: true,
};

const DEFAULT_APPLICATIONS = [
  {
    id: 'app-01',
    scholarshipId: 'sch-01',
    title: 'Aditi Empower STEM Fellowship for Women',
    provider: 'Aditi Foundation for Tech Leadership',
    amount: '₹2,50,000 / year',
    deadline: '2026-11-28',
    status: 'Preparing',
    notes: 'Drafted first version of SOP. Awaiting official bonafide certificate from college registrar.',
    appliedDate: '2026-11-01',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'app-02',
    scholarshipId: 'sch-02',
    title: 'Bharat NextGen Innovators Grant',
    provider: 'National Innovation & Research Trust',
    amount: '₹1,80,000 (One-time)',
    deadline: '2026-12-05',
    status: 'Submitted',
    notes: 'Submitted GitHub repo and project architecture presentation. Review results expected mid-December.',
    appliedDate: '2026-11-03',
    lastUpdated: '2026-11-04',
  },
  {
    id: 'app-03',
    scholarshipId: 'sch-07',
    title: 'CodeCraft Future Software Architects Scholarship',
    provider: 'OpenTech Developers Consortium',
    amount: '₹1,50,000 + Tech Setup',
    deadline: '2026-12-10',
    status: 'Interested',
    notes: 'Need to review open source PRs and write short tool essay before application opening closes.',
    appliedDate: null,
    lastUpdated: '2026-11-02',
  },
  {
    id: 'app-04',
    scholarshipId: 'sch-04',
    title: 'Dr. APJ Abdul Kalam Academic Excellence Award',
    provider: 'National Council for Academic Excellence',
    amount: '₹3,00,000',
    deadline: '2026-12-15',
    status: 'Under Review',
    notes: 'Academic transcripts and faculty recommendation letters verified by scrutiny cell.',
    appliedDate: '2026-10-28',
    lastUpdated: '2026-11-06',
  }
];

const DEFAULT_DOCUMENTS = [
  {
    id: 'doc-01',
    name: 'Updated Technical Resume (ATS-Optimized)',
    category: 'Resume/CV',
    status: 'Ready',
    fileName: 'Aarav_Patel_CV_2026.pdf',
    lastUpdated: '2026-11-02',
    notes: 'Updated with latest hackathon win and React projects.',
    isRequired: true,
  },
  {
    id: 'doc-02',
    name: '10th & 12th Board Marksheets (Self-Attested)',
    category: 'Mark sheets',
    status: 'Ready',
    fileName: 'CBSE_Board_Marksheets_Verified.pdf',
    lastUpdated: '2026-10-15',
    notes: 'Scanned in 300 DPI with clear seal.',
    isRequired: true,
  },
  {
    id: 'doc-03',
    name: 'College Semester Transcripts (Sem 1 to 4)',
    category: 'Academic transcripts',
    status: 'Ready',
    fileName: 'Semester_Transcripts_Sem1_4.pdf',
    lastUpdated: '2026-10-20',
    notes: 'Signed and stamped by college examination office.',
    isRequired: true,
  },
  {
    id: 'doc-04',
    name: 'Family Income Certificate (Tehsildar Issued)',
    category: 'Income certificate',
    status: 'Pending',
    fileName: null,
    lastUpdated: '2026-10-25',
    notes: 'Applied at local revenue center. Expected issue date: Nov 18.',
    isRequired: true,
  },
  {
    id: 'doc-05',
    name: 'Government Identity Proof (Aadhaar & Voter ID)',
    category: 'Identity documents',
    status: 'Ready',
    fileName: 'National_ID_Aadhaar_Masked.pdf',
    lastUpdated: '2026-09-10',
    notes: 'Masked Aadhaar copy with verified QR code.',
    isRequired: true,
  },
  {
    id: 'doc-06',
    name: 'Academic Letter of Recommendation (Prof. Sharma, HoD)',
    category: 'Recommendation letters',
    status: 'Pending',
    fileName: null,
    lastUpdated: '2026-11-01',
    notes: 'Draft provided to professor. Awaiting institutional letterhead print.',
    isRequired: true,
  },
  {
    id: 'doc-07',
    name: 'Statement of Purpose (STEM & Innovation)',
    category: 'Statement of Purpose',
    status: 'Ready',
    fileName: 'SOP_Engineering_Vision_v2.pdf',
    lastUpdated: '2026-11-04',
    notes: '500 words tailored for technical innovation fellowships.',
    isRequired: true,
  },
  {
    id: 'doc-08',
    name: 'College Bonafide Certificate & Enrollment Letter',
    category: 'Other documents',
    status: 'Missing',
    fileName: null,
    lastUpdated: null,
    notes: 'Need to submit form in college administrative wing.',
    isRequired: false,
  }
];

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    return getStorageItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  });

  // 2. Saved Scholarships
  const [savedIds, setSavedIds] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SAVED_SCHOLARSHIPS, ['sch-01', 'sch-02', 'sch-07']);
  });

  // 3. Applications
  const [applications, setApplications] = useState(() => {
    return getStorageItem(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
  });

  // 4. Document Vault
  const [documents, setDocuments] = useState(() => {
    return getStorageItem(STORAGE_KEYS.DOCUMENTS, DEFAULT_DOCUMENTS);
  });

  // 5. Saved Videos in Learn Hub
  const [savedVideos, setSavedVideos] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SAVED_VIDEOS, ['vid-01', 'vid-04']);
  });

  // Persist whenever state changes
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SAVED_SCHOLARSHIPS, savedIds);
  }, [savedIds]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.APPLICATIONS, applications);
  }, [applications]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.DOCUMENTS, documents);
  }, [documents]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SAVED_VIDEOS, savedVideos);
  }, [savedVideos]);

  // Profile Update Function
  const updateProfile = (fields) => {
    setProfile(prev => ({
      ...prev,
      ...fields,
      isOnboarded: true,
    }));
  };

  // Toggle Save Scholarship
  const toggleSaveScholarship = (id) => {
    setSavedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isScholarshipSaved = (id) => savedIds.includes(id);

  // Application CRUD
  const addApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      status: 'Interested',
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: '',
      ...appData,
    };
    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : app
      )
    );
  };

  const updateApplication = (id, updatedFields) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, ...updatedFields, lastUpdated: new Date().toISOString().split('T')[0] }
          : app
      )
    );
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  // Document Vault CRUD
  const updateDocument = (id, updates) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? { ...doc, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
          : doc
      )
    );
  };

  const addDocument = (docData) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      status: 'Pending',
      lastUpdated: new Date().toISOString().split('T')[0],
      isRequired: true,
      ...docData,
    };
    setDocuments(prev => [...prev, newDoc]);
    return newDoc;
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Video Save Toggle
  const toggleSaveVideo = (id) => {
    setSavedVideos(prev =>
      prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
    );
  };

  const isVideoSaved = (id) => savedVideos.includes(id);

  // Document Completion Metric
  const documentMetrics = useMemo(() => {
    const total = documents.length;
    const ready = documents.filter(d => d.status === 'Ready').length;
    const pending = documents.filter(d => d.status === 'Pending').length;
    const missing = documents.filter(d => d.status === 'Missing').length;
    const percentage = total === 0 ? 0 : Math.round((ready / total) * 100);
    return { total, ready, pending, missing, percentage };
  }, [documents]);

  // Application Readiness Score (indicative, 0-100)
  const readinessScore = useMemo(() => {
    let score = 0;
    // Profile completeness: up to 30
    if (profile.name && profile.email) score += 10;
    if (profile.course && profile.college) score += 10;
    if (profile.percentage && profile.annualIncome) score += 10;

    // Document readiness: up to 40
    score += Math.round((documentMetrics.percentage * 40) / 100);

    // Active applications: up to 30
    const inProgressCount = applications.filter(a => ['Preparing', 'Submitted', 'Under Review'].includes(a.status)).length;
    if (inProgressCount >= 1) score += 15;
    if (inProgressCount >= 3) score += 15;

    return Math.min(100, Math.max(20, score));
  }, [profile, documentMetrics, applications]);

  // Reset all user data to fresh initial demo
  const resetAllData = () => {
    setProfile(DEFAULT_PROFILE);
    setSavedIds(['sch-01', 'sch-02', 'sch-07']);
    setApplications(DEFAULT_APPLICATIONS);
    setDocuments(DEFAULT_DOCUMENTS);
    setSavedVideos(['vid-01', 'vid-04']);
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        updateProfile,
        savedIds,
        toggleSaveScholarship,
        isScholarshipSaved,
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplication,
        deleteApplication,
        documents,
        updateDocument,
        addDocument,
        deleteDocument,
        documentMetrics,
        savedVideos,
        toggleSaveVideo,
        isVideoSaved,
        readinessScore,
        resetAllData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
