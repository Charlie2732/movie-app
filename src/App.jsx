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
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(() => setError('Kunde inte hämta filmer. Kontrollera att servern kör.'))
  }, [])

  function addMovie(title, file) {
    setError(null)
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(newMovie => {
        if (file) {
          const formData = new FormData()
          formData.append('file', file)

          return fetch(`${API_URL}/${newMovie.id}/upload`, {
            method: 'POST',
            body: formData,
          })
            .then(res => res.json())
            .then(updatedMovie => setMovies([...movies, updatedMovie]))
        } else {
          setMovies([...movies, newMovie])
        }
      })
      .catch(() => setError('Kunde inte lägga till filmen. Försök igen.'))
  }

  function removeMovie(id) {
    setError(null)
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch(() => setError('Kunde inte ta bort filmen. Försök igen.'))
  }

  function updateMovie(id, newTitle) {
    setError(null)
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: newTitle }),
    })
      .then(() => {
        setMovies(movies.map(movie =>
          movie.id === id ? { ...movie, title: newTitle } : movie
        ))
      })
      .catch(() => setError('Kunde inte uppdatera filmen. Försök igen.'))
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

      {error && (
        <div style={{
          background: "#d9534f",
          color: "white",
          padding: "12px 20px",
          textAlign: "center",
          fontWeight: "bold",
        }}>
          {error}
        </div>
      )}

      <div className="movie-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={() => { addMovie(title, file); setTitle(''); setFile(null); }}>Lägg till film</button>
      </div>

      <MovieList movies={movies} onRemove={removeMovie} onUpdate={updateMovie} />
    </div>
  )
}

export default App