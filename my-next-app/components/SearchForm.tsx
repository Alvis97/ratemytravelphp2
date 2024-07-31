{/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchForm({ onSelectCountry }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (query.length > 1) {
      axios.get('/api/countries', { params: { query } })
        .then(response => setSuggestions(response.data))
        .catch(error => console.error('Error fetching countries:', error));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setQuery('');
    setSuggestions([]);
    onSelectCountry(country);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(country => (
            <li key={country.id} onClick={() => handleSelect(country)}>
              {country.countryName}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>Selected: {selectedCountry.countryName}</div>
      )}
    </div>
  );
}

export default SearchForm; */}

