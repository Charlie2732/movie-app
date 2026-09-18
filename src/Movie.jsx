import { useState } from 'react'

function Movie({ movie, onRemove, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(movie.title)

    function handleSave() {
        onUpdate(movie.id, newTitle)
        setIsEditing(false)
    }

    return (
        <li className="movie-card">
            {movie.imagePath && (
                <img src={`http://localhost:5215${movie.imagePath}`} alt={movie.title} width="120" />
            )}
            {isEditing ? (
                <>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <button onClick={handleSave}>Spara</button>
                </>
            ) : (
                <>
                    <p className="movie-info">{movie.title}</p>
                    <button onClick={() => setIsEditing(true)}>Redigera</button>
                </>
            )}
            <button className="remove-btn" onClick={() => onRemove(movie.id)}>Ta bort</button>
        </li>
    )
}

export default Movie