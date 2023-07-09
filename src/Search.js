import React, { useState, useEffect } from 'react';

const Search = ({ onSearch,resetSearch, resetSearchHandled}) => {



    useEffect(() => {
        if (resetSearch) {
          setQuery('');
          resetSearchHandled();
        }
      }, [resetSearch, resetSearchHandled]);



  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search w-form">
      <input
        type="search"
        className="search-input w-node-ee5cdea1-0f0e-c782-ff2c-fd0a57a27234-e0625fb8 w-input"
        maxLength={256}
        name="query"
        placeholder="Search…"
        id="search"
        required=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="submit"
        defaultValue=""
        id="w-node-ee5cdea1-0f0e-c782-ff2c-fd0a57a27235-e0625fb8"
        className="search-button w-button"
      />
    </form>
  );
};

export default Search;
