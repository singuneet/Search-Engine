import { useState } from 'react';

const SearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const results = [
      { id: 1, title: 'Result 1', description: 'This is result 1' },
      { id: 2, title: 'Result 2', description: 'This is result 2' },
      { id: 3, title: 'Result 3', description: 'This is result 3' },
    ];

    const filteredResults = results.filter((result) =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleAutoComplete = (term) => {
    const suggestions = [
      'diabetes',
      'cancer',
      'Parkinson',
      'Alzheimer',
      'hypertension',
      'asthma',
      'heart disease',
      'stroke',
      'epilepsy',
      'multiple sclerosis',
    ];

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(term.toLowerCase())
    );

    setAutoComplete(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion); // Automatically perform search on suggestion click
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative flex justify-center w-full">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleAutoComplete(e.target.value);
              if (e.target.value.length > 0) {
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            placeholder="Search..."
            className="w-80 p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {showSuggestions && (
            <ul className="absolute top-full left-0 w-80 bg-white border border-gray-300 rounded-lg z-10">
              {autoComplete.map((suggestion) => (
                <li
                  key={suggestion}
                  className="p-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 p-2 text-sm text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
      >
        Search
      </button>
      <div className="flex flex-col w-80 mt-4">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="p-4 mb-4 text-sm text-gray-700 border border-gray-300 rounded-lg"
          >
            <h2 className="mb-2 text-lg font-bold">{result.title}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEngine;
