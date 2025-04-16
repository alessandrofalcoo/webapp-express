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

    const sql = `SELECT * FROM movies JOIN reviews ON reviews.movie_id = ${movieId} `

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

module.exports = { index, show }
