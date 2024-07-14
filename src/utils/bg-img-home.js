
const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2I3MDgzZGFiY2E2NDNhNGQzZTRmNjJiMWI0YTIwYiIsInN1YiI6IjY2MjI4MGFjMzJjYzJiMDE2MzBkN2M3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5uHWGor_6azvkSR1VKSmOCwvcEc4htYTwNe9D0G9_K4'

const getBackgroundImage = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the token here
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching background image: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    const imageUrl = `https://image.tmdb.org/t/p/w1280/${randomMovie.poster_path}`;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching background image:', error);
    // Handle errors gracefully (display message, retry, etc.)
  }
};

export default getBackgroundImage;