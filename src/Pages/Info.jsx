import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/info.css";

const Info = () => {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsFetching(true);

      try {
        // Fetch movie details
        const movieDetailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&language=es-ES`
        );
        const movieDetailsData = await movieDetailsResponse.json();

        // Fetch trailers (optional, requires additional API key)
        const trailersResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&language=es-ES`
        );
        const trailersData = await trailersResponse.json();

        if (movieDetailsData) {
          setMovieDetails({
            ...movieDetailsData,
            trailers: trailersData.results,
          }); // Combine details and trailers
        } else {
          setError("No se encontró información para la película");
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMovieDetails();
  }, [movie_id]);

  if (isFetching) {
    return <div className="info-container">Cargando...</div>;
  }

  if (error) {
    return <div className="info-container">Error: {error.message}</div>;
  }

  if (!movieDetails) {
    return (
      <div className="info-container">
        No se encontró información para la película
      </div>
    );
  }

  // Display movie details
  return (
    <div className="info-container">
      <div className="info-trailer">
        {movieDetails.trailers && movieDetails.trailers.length > 0 ? (
          // Filter trailers and select YouTube trailer if available
          movieDetails.trailers.find(
            (trailer) => trailer.site === "YouTube"
          ) ? (
            <iframe
              key={
                movieDetails.trailers.find(
                  (trailer) => trailer.site === "YouTube"
                ).id
              }
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                movieDetails.trailers.find(
                  (trailer) => trailer.site === "YouTube"
                ).key
              }`}
              title={
                movieDetails.trailers.find(
                  (trailer) => trailer.site === "YouTube"
                ).name
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            // If no YouTube trailer found, use the first trailer
            <iframe
              key={movieDetails.trailers[0].id}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movieDetails.trailers[0].key}`}
              // title={movieDetails.trailers[0].name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )
        ) : (
          <p>No se encontraron trailers disponibles.</p>
        )}
      </div>
      <div className="info-img">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <div className="info-title">
          <h2>{movieDetails.title}</h2>
          <div className="info-desc">
            <p>{movieDetails.overview}</p>
            <div className="info-details">
              <span>Fecha de estreno:</span> {movieDetails.release_date}
              <br />
              <span>Géneros:</span>{" "}
              {movieDetails.genres.map((genre) => genre.name).join(", ")}
              <br />
              <span>Duración:</span> {movieDetails.runtime} minutos
              <br />
              <span>Puntuación:</span> {movieDetails.vote_average}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
