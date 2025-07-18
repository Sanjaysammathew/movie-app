const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Load movies data on server start
const moviesDataPath = path.join(__dirname, "movies_metadata.json");
let movies = [];

try {
  const rawData = fs.readFileSync(moviesDataPath, "utf-8");
  movies = JSON.parse(rawData);
  console.log(`❇️ Loaded ${movies.length} movies from movies_metadata.json`);
} catch (err) {
  console.error("❌ Failed to load movies data:", err);
  process.exit(1); 
}


app.get("/api/ping", (req, res) => {
  console.log("❇️ Received GET request to /api/ping");
  res.send("pong!");
});


app.get("/api/movies", (req, res) => {
  console.log("❇️ Received GET request to /api/movies");
  
  const movieList = movies.map(({ id, title, tagline, vote_average }) => ({
    id,
    title,
    tagline,
    vote_average,
  }));
  res.json(movieList);
});


app.get("/api/movies/:id", (req, res) => {
  console.log(`❇️ Received GET request to /api/movies/${req.params.id}`);
  const movieId = req.params.id;
  const movie = movies.find((m) => String(m.id) === String(movieId));

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});


let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log("⚠️ Do you need to set 'start': 'npm run development' in package.json?");
}

const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
