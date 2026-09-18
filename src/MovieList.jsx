import Movie from './Movie'

function MovieList({ movies, onRemove, onUpdate }) {
    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} onRemove={onRemove} onUpdate={onUpdate} />
            ))}
        </ul>
    )
}

export default MovieList