// src/components/searchSignInContainer/SearchSignInContainer.js

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar'; // Updated import
import DarkModeButton from '../darkMode/DarkModeButton';
import UserInfo from '../userInfo/UserInfo';
import './SearchSignInContainer.css';

const SearchSignInContainer = ({ isDarkMode, toggleDarkMode, user, handleSignOut }) => {
    return (
        <div className="search-signin-container">
            <Link to="/create" className="btn create-button">
                <i className="bi bi-patch-plus"></i>
            </Link>
            <SearchBar className="search-bar" />
            <Link to="/" className="app-logo-link">
                <img src={isDarkMode ? "/images/logo-dark.svg" : "/images/logo-light.svg"} alt="Logo" className="app-logo" />
            </Link>
            <DarkModeButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <UserInfo user={user} handleSignOut={handleSignOut} />
        </div>
    );
}

export default SearchSignInContainer;
