async function getRandomComedyMovie() {
  const apiKey = 'f7b7083dabca643a4d3e4f62b1b4a20b'; // Replace with your actual TMDb API key
  const baseUrl = 'https://api.themoviedb.org/3/discover/movie';

  const response = await fetch(
    `${baseUrl}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=35&page=1`
  );
  const data = await response.json();

  const randomMovieIndex = Math.floor(Math.random() * data.results.length);
  const movie = data.results[randomMovieIndex];

  const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const title = movie.original_title;

  return {
    posterPath,
    title,
  };
}

export default getRandomComedyMovie