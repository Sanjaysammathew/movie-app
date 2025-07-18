import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;


  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : "N/A";

  
  const runtime = movie.runtime ? `${movie.runtime} minutes` : "N/A";

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Back to List
      </button>
      <h1>{movie.title}</h1>
      <p><strong>Tagline:</strong> {movie.tagline || "N/A"}</p>
      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
      <p><strong>Release Date:</strong> {releaseDate}</p>
      <p><strong>Runtime:</strong> {runtime}</p>
      <p><strong>Overview:</strong> {movie.overview || "N/A"}</p>

    </div>
  );
}
