import './App.css'
import Home from './Pages/Home'
import Info from './Pages/Info'
// import Login from './Pages/Login'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './Pages/SearchResults'
// import Category from './Pages/Category'
// import Movies from './Pages/Movies'
import Prices from './Pages/Prices'
import CategoryMovies from './Pages/CategoryMovies'

function App() {


  return (
    <>
        <Navbar />
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />   */}
        <Route path="/" element={<Home />} />  
        <Route path="/about" element={<Prices />} /> 
        <Route path="/info/:movie_id" element={<Info />} />  
        <Route path="/search" element={<SearchResults />} />
        {/* <Route path="/Movies" element={<Movies />} />  */}
        <Route path="/info/:movie_id" element={<CategoryMovies />} /> 
        {/* <Route path="/Category" element={<Category />} />  */}

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
