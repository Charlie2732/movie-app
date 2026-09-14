import Movie from './Movie'

function MovieList({ movies, onRemove }) {
    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} onRemove={onRemove} />
            ))}
        </ul>
    )
}

export default MovieList