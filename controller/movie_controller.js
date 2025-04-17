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

    const sql = `SELECT * FROM movies JOIN reviews ON reviews.movie_id = ${movieId}`

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
    const movieId = Number(req.params.id)
    const name = req.params.name
    const vote = Number(req.params.vote)
    const text = req.params.text
    const created = Date(req.params.created_at)
    const updated = Date(req.params.updated_at)

    const sql = `INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at) VALUES (${movieId}, ${name}, ${vote}, ${text}, ${created}, ${updated})`

    const inputValues = [movieId, name, vote, text, created, updated]
    connection.query(sql, inputValues, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        const review = results[0]
        res.json(review)
    })
}

module.exports = { index, show, store }
