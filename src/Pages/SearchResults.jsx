import { useState, useEffect } from 'react';
import '../styles/components/searchresults.css'; // Import CSS
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing query params
import { Link } from 'react-router-dom'; // Import Link for navigation

const SEARCH_API = 'https://api.themoviedb.org/3/search/multi?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&language=es-ES&include_adult=false&query='; // TMDB search API endpoint
console.log('hola');
const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const location = useLocation(); // Get location object for accessing query params

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchTerm = new URLSearchParams(location.search).get('q'); // Get search term from query parameter
      if (!searchTerm) { // Don't fetch if search term is empty
        return;
      }

      try {
        const response = await fetch(SEARCH_API + searchTerm);
        const data = await response.json();
        setSearchResults(data.results); // Update search results state
      } catch (err) {
        console.error('Error fetching search results:', err);
      }
    };

    fetchSearchResults();
  }, [location]); // Dependency array: update on location change

  return (
    <div className="search-results-container">
      {searchResults.map((result) => (
        <li key={result.id} className="search-result-item">
    {/* Envuelve el resultado en un Link con `to` prop */}
    <Link to={`/info/${result.id}`}>
      <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title} />
      <h2>{result.title}</h2>
    </Link>
  </li>
      ))}
    </div>
  );
};

export default SearchResults;