import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import neonBg from './assets/Neon.jpg'

const API_URL = 'http://localhost:5215/api/movies'

function ToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <>
      <div
        onClick={() => setOn(!on)}
        style={{
          width: 55, height: 25, borderRadius: 15,
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
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Kunde inte hämta filmer:', err))
  }, [])

  function addMovie(title) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(newMovie => setMovies([...movies, newMovie]))
      .catch(err => console.error('Kunde inte lägga till film:', err))
  }

  function removeMovie(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch(err => console.error('Kunde inte ta bort film:', err))
  }

  return (
    <div style={{
      backgroundImage: `url(${neonBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      padding: "0",
      boxSizing: "border-box",
    }}>
      <ToggleSwitch />

      <div className="movie-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
        <button onClick={() => { addMovie(title); setTitle(''); }}>Lägg till film</button>
      </div>

      <MovieList movies={movies} onRemove={removeMovie} />
    </div>
  )
}

export default App