import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectDetails from './components/ProjectDetails';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import LiveChat from './components/LiveChat';
import Help from './components/Help';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/livechat" element={<LiveChat />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
