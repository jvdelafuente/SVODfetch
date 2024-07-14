import { useState, useEffect } from 'react';
import '../styles/category.css'; // Import CSS for styling

const TMDB_CATEGORIES_API = 'https://api.themoviedb.org/3/genre/movie/list?api_key=f7b7083dabca643a4d3e4f62b1b4a20b&language=es-ES'; // Replace with your API key

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(TMDB_CATEGORIES_API);
        const data = await response.json();
        setCategories(data.genres);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <a href=""><h2 className="category-item">{category.name}</h2></a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;