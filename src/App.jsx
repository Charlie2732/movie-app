import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

function App() {
  const [movies, setMovies] = useState([])

  const [title, setTitle] = useState('')

  function addMovie(title) {
    const newMovie = { id: Date.now(), title: title }
    setMovies([...movies, newMovie])
  }

  function removeMovie(id) {
    setMovies(movies.filter(movie => movie.id !== id))
  }

  return (
    <>
      <div className="movie-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" />
        <button onClick={() => addMovie(title)}>Lägg till film</button>
      </div>

      <MovieList movies={movies} onRemove={removeMovie} />
    </>
  )
}

export default App