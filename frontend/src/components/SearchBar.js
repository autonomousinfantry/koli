import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/api/videos/search?query=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setSearchResults(data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search videos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
