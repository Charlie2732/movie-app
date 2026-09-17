import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

const allMovies = [
  { id: 1, title: "Pulp Fiction", imageUrl: "https://tse1.mm.bing.net/th/id/OIP.5T3iaBnBYOhT7spyVkjKvQHaKj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, title: "The Godfather", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg" },
  { id: 3, title: "The Dark Knight", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg" },
  { id: 4, title: "Dirty Dancing", imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Dirty_Dancing.jpg" },
  { id: 5, title: "The Matrix", imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png" },
  { id: 6, title: "Inception", imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
  { id: 7, title: "Fight Club", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg" },
  { id: 8, title: "Forrest Gump", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg" },
  { id: 9, title: "Titanic", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" },
  { id: 10, title: "Terminator 2", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/Terminator_2-Judgment_Day.png" },
]

function ToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <>
      <div
        onClick={() => setOn(!on)}
        style={{
          width: 60, height: 30, borderRadius: 15,
          background: on ? "#02C39A" : "#ccc",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 26, height: 26, borderRadius: "50%",
            background: "white", margin: 2,
            transform: on ? "translateX(30px)" : "translateX(0)",
          }}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "black",
          opacity: on ? 0 : 0.6,
          pointerEvents: "none",
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  const searchResults = search
    ? allMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    : []

  function addMovie(movie) {
    setMovies([...movies, movie])
  }

  function removeMovie(id) {
    setMovies(movies.filter(movie => movie.id !== id))
  }

  return (
    <>
      <ToggleSwitch />

      <div className="movie-form">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök film..."
        />

        {searchResults.map(movie => (
          <div key={movie.id} className="search-result">
            <img src={movie.imageUrl} alt={movie.title} className="search-thumb" />
            <span>{movie.title}</span>
            <button onClick={() => addMovie(movie)}>Lägg till</button>
          </div>
        ))}
      </div>

      <MovieList movies={movies} onRemove={removeMovie} />
    </>
  )
}

export default App