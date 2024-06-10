import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import TeamsPage from './pages/TeamsPage';
import VideoSharePage from './pages/VideoSharePage';
import analytics from './services/analytics';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    analytics.initGA();
    analytics.logPageView();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/share/:videoId" element={<VideoSharePage />} />
      </Routes>
    </Router>
  );
}

export default App;
