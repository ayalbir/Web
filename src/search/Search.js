// src/search/Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit" className="btn btn-secondary">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default Search;
