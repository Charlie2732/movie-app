import { useState } from 'react'
import './App.css'
import darkKnightImg from './assets/dark-knight.jpg'
import godfatherImg from './assets/godfather.jpg'
import braveheartImg from './assets/braveheart.jpg'
import terminator2Img from './assets/terminator2.jpg'
import bloodInBloodOutImg from './assets/blood-in-blood-out.jpg'

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Terminator 2",
      year: 1991,
      genre: "Sci-fi",
      poster: terminator2Img,
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      poster: darkKnightImg,
    },
    {
      id: 3,
      title: "Braveheart",
      year: 1995,
      genre: "Drama",
      poster: braveheartImg,
    },
    {
      id: 4,
      title: "The Godfather",
      year: 1972,
      genre: "Drama",
      poster: godfatherImg,
    },
    {
      id: 5,
      title: "Blood In Blood Out",
      year: 1993,
      genre: "Drama",
      poster: bloodInBloodOutImg,
    },
  ])

  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')

  function addMovie(title, year, genre) {
    const newMovie = { id: Date.now(), title: title, year: year, genre: genre, }
    setMovies([...movies, newMovie])
  }

  function removeMovie(id) {
    setMovies(movies.filter(movie => movie.id !== id))
  }

  return (
    <>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <button onClick={() => addMovie(title, year, genre)}>Lägg till film</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title} width="150" />
            <p>{movie.title} ({movie.year}) - {movie.genre}</p>
            <button onClick={() => removeMovie(movie.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App