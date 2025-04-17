const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        console.log(results);
        res.json(results)

    })
}

function show(req, res) {
    const movieId = Number(req.params.id)

    const sql = `SELECT * FROM movies JOIN reviews ON reviews.movie_id = ?`

    connection.query(sql, [movieId], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        if (results.length === 0) return res.status(404).json({
            message: 'There is nothing to show'
        })
        const movie = results[0]

        res.json(movie)
    })
}

function store(req, res) {
    console.log(req.body);

    const {
        movie_id: movieId,
        name: name,
        vote: vote,
        text: text
    } = req.body;

    const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`

    const inputValues = [movieId, name, vote, text]
    connection.query(sql, inputValues, (err, results) => {
        console.log(err);
        if (err) return res.status(500).json({
            error: 'Query failed'

        })
        // Restituisci l'ID della recensione appena creata
        res.status(201).json({
            message: 'Review created successfully',
            reviewId: results.insertId
        });
    })
}

module.exports = { index, show, store }
