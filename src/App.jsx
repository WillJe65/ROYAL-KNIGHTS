import React, { useState } from 'react';
import './App.css';

function App() {
  const [favorites, setfavorites] = useState([]);

  function addToFavorites(item) {
    setfavorites([...favorites, item]);
  }

  function removetofavorites(item) {
    setfavorites(favorites.filter(fav => fav !== item));
  }

  
  return (
    <>
      <button class="like" onClick={addToFavorites}>
      </button>
    </>
  )
}

export default App;