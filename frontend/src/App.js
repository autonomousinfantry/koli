import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';
import VideoReview from './components/VideoReview';
import TeamManagement from './components/TeamManagement';
import Notifications from './components/Notifications';
import UserProfile from './components/UserProfile';
import FileComparison from './components/FileComparison';
import UserInvites from './components/UserInvites';
import HelpSupport from './components/HelpSupport';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
          </>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/project/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/video-review" element={<ProtectedRoute><VideoReview /></ProtectedRoute>} />
          <Route path="/team-management" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/file-comparison" element={<ProtectedRoute><FileComparison /></ProtectedRoute>} />
          <Route path="/user-invites" element={<ProtectedRoute><UserInvites /></ProtectedRoute>} />
          <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
