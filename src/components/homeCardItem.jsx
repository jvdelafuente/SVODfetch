import { useState, useEffect } from 'react';
import '../styles/components/homecarditem.css'; // Importar CSS personalizado
import { Link } from 'react-router-dom';

const HomeCardItem = () => {
  const [movieData, setMovieData] = useState(null); // State to store trending movie data
  const [isFetching, setIsFetching] = useState(false); // State to control loading
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const fetchTrending = async () => {
      setIsFetching(true); // Mark fetching in progress

      try {
        const timeWindow = 'day'; // Change to 'week' if desired

        const response = await fetch(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&language=es-ES`);
        const data = await response.json();

        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          const randomTrendingItem = data.results[randomIndex];

          // Check media_type before setting movieData
          if (randomTrendingItem.media_type === 'movie') {
            // Use the actual identifier property name here (e.g., tmdb_id)
            const identifier = randomTrendingItem.id || randomTrendingItem.movie_id; // Handle missing identifier

            if (identifier) { // Check if identifier exists
              setMovieData({
                poster_path: `https://image.tmdb.org/t/p/w500/${randomTrendingItem.poster_path}`,
                title: randomTrendingItem.title,
                category: 'trending',
                // Use identifier for URL construction
                identifier,
              });
            } else {
              console.warn('Non-movie trending item retrieved or missing identifier:', randomTrendingItem);
            }
          } else {
            console.warn('No se encontraron elementos en tendencia');
          }
        } else {
          setError('No se encontraron elementos en tendencia');
        }
      } catch (err) {
        setError(err); // Handle network errors
      } finally {
        setIsFetching(false); // Mark fetching complete
      }
    };

    fetchTrending();
  }, []);

  // Show loading state while fetching data
  if (isFetching) {
    return <div className="movie-card">Cargando...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="movie-card">Error: {error.message}</div>;
  }

  // Show movie details if data is available
  if (movieData) {
    // Use identifier in the URL
    console.log('Movie ID:', movieData.identifier);
    return (
      <div className="home-card">
        <Link to={`/info/${movieData.identifier}`}> {/* Pass identifier here */}
          <img src={movieData.poster_path} alt="Imagen del elemento en tendencia" className="home-card-img" />
          <h2 className="home-card-title">{movieData.title}</h2>
        </Link>
      </div>
    );
  }

  // Show a message if no movie data is available
  return <div className="movie-card">No se encontró una película en tendencia.</div>;
};

export default HomeCardItem;