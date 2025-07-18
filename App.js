import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListMovies from "./ListMovies";
import MovieDetails from "./MovieDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Movies App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListMovies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
