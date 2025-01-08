const db = require('../data/db');


function index(req, res) {
    db.query('SELECT * FROM movies', (err, films) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        res.json(films);
    });
}

function show(req, res) {
    const filmId = req.params.id;
    // Recupero il film
    db.query('SELECT * FROM movies WHERE id = ?', [filmId], (err, filmResults) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        if (filmResults.length === 0) {
            return res.status(404).json({ message: 'Film not found' });
        }

        const film = filmResults[0];
        // Recupero le recensioni del film
        db.query('SELECT * FROM reviews WHERE movie_id = ?', [filmId], (err, reviewResults) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            film.reviews = reviewResults;
            // Calcolo la media dei voti
            db.query('SELECT AVG(vote) as averageRating FROM reviews WHERE movie_id = ?', [filmId], (err, ratingResult) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error', error: err.message });
                }

                film.averageRating = ratingResult[0].averageRating;
                res.json(film);
            });
        });
    });
}

module.exports = {
    index,
    show
};
