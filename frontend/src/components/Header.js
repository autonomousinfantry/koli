import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Koli</div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
                <img src="/path/to/profile-pic.jpg" alt="User Profile" />
            </div>
        </header>
    );
};

export default Header;
