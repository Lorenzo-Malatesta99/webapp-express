const db = require("../data/db");

function index(req, res) {
  const search = req.query.search;

  if (search) {
    db.query(
      "SELECT * FROM movies WHERE title LIKE ?",
      [`%${search}%`],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
        }
        res.json(results);
      }
    );
  } else {
    db.query("SELECT * FROM movies", (err, films) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      }
      res.json(films);
    });
  }
}

function show(req, res) {
  const filmId = req.params.id;
  // Recupero il film
  db.query(
    "SELECT * FROM movies WHERE id = ?",
    [filmId],
    (err, filmResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      }
      if (filmResults.length === 0) {
        return res.status(404).json({ message: "Film not found" });
      }

      const film = filmResults[0];
      // Recupero le recensioni del film
      db.query(
        "SELECT * FROM reviews WHERE movie_id = ?",
        [filmId],
        (err, reviewResults) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Internal server error", error: err.message });
          }

          film.reviews = reviewResults;
          // Calcolo la media dei voti
          db.query(
            "SELECT AVG(vote) as averageRating FROM reviews WHERE movie_id = ?",
            [filmId],
            (err, ratingResult) => {
              if (err) {
                return res.status(500).json({
                  message: "Internal server error",
                  error: err.message,
                });
              }

              film.averageRating = ratingResult[0].averageRating;
              res.json(film);
            }
          );
        }
      );
    }
  );
}

function storeReview(req, res) {
  const id = req.params.id;
  const { text, vote, name } = req.body;
  console.log(id, text, vote, name);
  // Check if the required fields are missing
  if (
    !id ||
    !name ||
    // isNaN(vote) ||
    !text ||
    vote < 0 ||
    vote > 5 ||
    name?.length > 255 ||
    typeof name !== "string"
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // return
  const sql =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)"; // SQL query
  db.query(sql, [id, name, vote, text], (err) => {
    // Check if there is an error
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
    // return
    res.status(201).json({ message: "Review added" });
  });
}

module.exports = {
  index,
  show,
  storeReview,
};
