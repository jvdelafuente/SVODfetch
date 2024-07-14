import { useState, useEffect } from 'react';
import '../styles/movies.css'; // Importar CSS para el estilo
import HomeCardItem from '../components/homeCardItem';

const TMDB_RANDOM_MOVIES_API = 'https://api.themoviedb.org/3/discover/movie?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&sort_by=popularity.desc&page=1&include_adult=false&language=es-ES'; // Reemplazar con tu propia API key

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await fetch(TMDB_RANDOM_MOVIES_API);
        const data = await response.json();

        // Filtrar películas para evitar duplicados por ID
        const filteredMovies = filterUniqueMovies(data.results);

        // Limitar a 80 películas después de filtrar
        setMovies(filteredMovies.slice(0, 80));
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchRandomMovies();
  }, []);

  // Función para filtrar películas únicas por ID
  const filterUniqueMovies = (movieList) => {
    const uniqueMovies = [];
    const encounteredIds = new Set();

    movieList.forEach(movie => {
      if (!encounteredIds.has(movie.id)) {
        encounteredIds.add(movie.id);
        uniqueMovies.push(movie);
      }
    });

    return uniqueMovies;
  };

  return (
    <div className="movies-container">
      <h2>Random Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <HomeCardItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;