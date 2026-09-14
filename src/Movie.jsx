function Movie({ movie, onRemove }) {
    return (
        <li className="movie-card">
            <p className="movie-info">{movie.title}</p>
            <button className="remove-btn" onClick={() => onRemove(movie.id)}>Ta bort</button>
        </li>
    )
}

export default Movie