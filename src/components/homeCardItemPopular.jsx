import { useState, useEffect } from 'react';
import '../styles/components/homecarditem.css'; 
import { Link } from 'react-router-dom';

const PopularHorrorMovies = () => {
  const [movieData, setMovieData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsFetching(true);

      try {
        const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
        const params = {
          api_key: 'f7b7083dabca643a4d3e4f62b1b4a20b',
          language: 'es-ES',
          with_genres: 27, 
        };

        const url = new URL(baseUrl);
        url.search = new URLSearchParams(params);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setMovieData(data.results[randomIndex]); 
        } else {
          setError('No se encontraron películas de terror populares');
        }
      } catch (err) {
        setError(err); 
      } finally {
        setIsFetching(false);
      }
    };

    fetchPopularMovies();
  }, []); 

  if (isFetching) {
    return <div className="movie-card">Cargando...</div>;
  }

  if (error) {
    return <div className="movie-card">Error: {error.message}</div>;
  }

  if (movieData) {
    const { id, poster_path, title } = movieData;

    return (
      <div className="home-card">
        <Link to={`/info/${id}`}> {/* Pass movie ID here */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="Imagen de la película de terror popular"
            className="home-card-img"
          />
          <h2 className="home-card-title">{title}</h2>
        </Link>
      </div>
    );
  }

  return <div className="movie-card">No se encontraron películas de terror populares.</div>;
};

export default PopularHorrorMovies;