import { useState, useEffect, useLocation } from 'react';
import '../styles/category-movies.css'; // Create a new CSS file for styling
import { Link } from 'react-router-dom'; // Import Link for navigation

const TMDB_DISCOVER_MOVIES_API = 'https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=es-ES'; // TMDB discover movies API endpoint

const CategoryMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState(''); // State for genre name
  const location = useLocation(); // Get URL query parameters

  useEffect(() => {
    const fetchMovies = async () => {
      const genreId = new URLSearchParams(location.search).get('genre_id');
      const searchQuery = genreId ? `with_genres=${genreId}` : ''; // Construct search query

      try {
        const response = await fetch(TMDB_DISCOVER_MOVIES_API + searchQuery);
        const data = await response.json();
        setMovies(data.results);

        // Extract genre name from the response
        if (genreId) {
          const genre = data.genres.find((g) => g.id === parseInt(genreId));
          if (genre) {
            setGenreName(genre.name);
          }
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, [location]);

  return (
    <div className="category-movies-container">
      <h2>{genreName || 'No Category Selected'} Movies</h2>
      <ul className="category-movies-grid">
        {movies.map((movie) => (
          <li key={movie.id} className="category-movie-item">
            <Link to={`/info/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMovies;