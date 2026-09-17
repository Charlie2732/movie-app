function Movie({ movie, onRemove }) {
    return (
        <li className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} width="120" />
            <p className="movie-info">{movie.title}</p>
            <button className="remove-btn" onClick={() => onRemove(movie.id)}>Ta bort</button>
        </li>
    )
}

export default Movie