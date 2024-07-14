// import HomeCardItem from '../components/homeCardItem'
// import PopularHorrorMovies from '../components/homeCardItemPopular'
// import PopularComedy from '../components/homeCardItemShow'
import '../styles/home.css'
// import { useState, useEffect } from 'react';
// import getBackgroundImage from '../utils/bg-img-home';

export default function Home() {

  //   const [backgroundImage, setBackgroundImage] = useState('');

  // useEffect(() => {
  //   getBackgroundImage().then(imageUrl => setBackgroundImage(imageUrl));
  // }, []);

  return (
    <>
    <div className='home-container'>
      <h1>OPPENHEIMER</h1>
      <button><a href="/info/872585">Play now</a></button>
            </div>
    {/* <div className='home-2-container'>
              <h1>Recomended</h1>

      <div id='home-lines' className="home-trending">
        <HomeCardItem />
        <HomeCardItem />
        <HomeCardItem />
      </div>
              <h1>Horror</h1>

      <div id='home-lines' className="home-family">
        <PopularHorrorMovies />
        <PopularHorrorMovies />
        <PopularHorrorMovies />
      </div>
        <h1>To be unable to stop laughing.</h1>
      <div id='home-lines' className="home-tvshow">
      <PopularComedy />
      <PopularComedy />
      <PopularComedy />
      </div> */}

    {/* </div> */}

    </>
  )
}
