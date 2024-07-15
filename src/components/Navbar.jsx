import { useState } from 'react';
import '../styles/components/navbar.css'; // Import CSS

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term on input change
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!searchTerm) return; // Don't redirect if search term is empty

    // Encode search term for URL safety
    const searchQuery = encodeURIComponent(searchTerm);

    // Navigate to /search with search term as a query parameter
    window.location.href = `/search?q=${searchQuery}`;
  };
  return (
    <div className='navbar-container'>
      <div className="navbar-logo-container">
        <a href="/"><h2>SVOD</h2></a>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <input
          placeholder='Search'
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        </form>
      <div className="navbar-link-container">
        {/* <a href="/Movies">Movies</a> */}
        {/* <a href="/Category">Categories</a> */}
        {/* <a href="/Prices">Prices</a> */}
        <a href="/about">Links</a>
      </div>
    </div>
  );
}