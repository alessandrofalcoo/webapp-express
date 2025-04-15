const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const connection = require('./data/db')

app.listen(PORT, () => {
    console.log('Server is listening on http://localhost:' + PORT);

})

app.use(express.json());


// There is the front-end URL
app.use(cors({
    origin: ''
}))

// Routes

app.get('/', (req, res) => {
    res.send('Movies API Server!')
})

// Index route for movies

app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        console.log(results);
        res.json(results)

    })
    //  res.json({ message: 'List of movies' })
})

// Show route for a single movie

app.get('/movies/:id', (req, res) => {
    const movieId = Number(req.params.id)

    const sql = 'SELECT * FROM movies JOIN reviews ON reviews.movie_id = ' + movieId

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
})