import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListMovies.css";

export default function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies-grid">
      {movies.map(({ id, title, tagline, vote_average }) => (
        <div
          key={id}
          className="movie-card"
          onClick={() => navigate(`/movies/${id}`)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && navigate(`/movies/${id}`)}
        >
          <h3>{title}</h3>
          <p className="tagline">{tagline || "No tagline available"}</p>
          <p className="rating">Rating: {vote_average} / 10</p>
        </div>
      ))}
    </div>
  );
}
