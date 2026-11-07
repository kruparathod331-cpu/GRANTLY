import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import PageLoader from './components/PageLoader';

// Code-split pages for high performance
const Landing = lazy(() => import('./pages/Landing'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Discover = lazy(() => import('./pages/Discover'));
const ScholarshipDetails = lazy(() => import('./pages/ScholarshipDetails'));
const Applications = lazy(() => import('./pages/Applications'));
const SavedScholarships = lazy(() => import('./pages/SavedScholarships'));
const DocumentVault = lazy(() => import('./pages/DocumentVault'));
const Learn = lazy(() => import('./pages/Learn'));
const ThemeStudio = lazy(() => import('./pages/ThemeStudio'));
const Profile = lazy(() => import('./pages/Profile'));

export default function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-theme-main text-theme-main transition-colors duration-200">
            {/* Top Navigation with Mandatory Creator Credit */}
            <Navbar />

            {/* Page Routes with Suspense */}
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/saved" element={<SavedScholarships />} />
                  <Route path="/documents" element={<DocumentVault />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/themes" element={<ThemeStudio />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />

            {/* Global Floating AI Student Assistant */}
            <ChatbotWidget />
          </div>
        </Router>
      </StudentProvider>
    </ThemeProvider>
  );
}
