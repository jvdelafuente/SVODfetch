import { useState, useEffect } from 'react';
import '../styles/components/homecarditem.css'; // Importar CSS personalizado
import { Link } from 'react-router-dom';

const PopularComedy = () => {
  // State to store movie data
  const [movieData, setMovieData] = useState(null);
  // State to control loading
  const [isFetching, setIsFetching] = useState(false);
  // State to store errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsFetching(true); // Mark fetching in progress

      try {
        // API endpoint for discover movies with comedy genre
        const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
        const params = {
          api_key: 'f7b7083dabca643a4d3e4f62b1b4a20b',
          language: 'es-ES',
          with_genres: 35, // Comedy genre ID (you can find genre IDs here: https://developer.themoviedb.org/reference/genre-movie-list)
        };

        const url = new URL(baseUrl);
        url.search = new URLSearchParams(params);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setMovieData(data.results[randomIndex]); // Show random movie
        } else {
          setError('No se encontraron películas de comedia populares');
        }
      } catch (err) {
        setError(err); // Handle network errors
      } finally {
        setIsFetching(false); // Mark fetching complete
      }
    };

    fetchPopularMovies();
  }, []); // Run only once when the component mounts

  // Display based on states
  if (isFetching) {
    return <div className="movie-card">Cargando...</div>;
  }

  if (error) {
    return <div className="movie-card">Error: {error.message}</div>;
  }

  if (movieData) {
    // Access movie details and ID
    const { id, poster_path, title } = movieData;

    return (
      <div className="home-card">
        <Link to={`/info/${id}`}> {/* Pass movie ID here */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="Imagen de la película popular"
            className="home-card-img"
          />
          <h2 className="home-card-title">{title}</h2>
        </Link>
      </div>
    );
  }

  return <div className="movie-card">No se encontraron películas de comedia populares.</div>;
};

export default PopularComedy;