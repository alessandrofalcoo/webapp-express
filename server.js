const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const moviesRouter = require('./routes/movies')
const error_404 = require('./middlewares/error_404')
const serverError = require('./middlewares/server_error')

// There is the front-end URL
app.use(cors({
    origin: 'http://localhost:5173/'
}))

app.use(express.json());

app.use(express.static('/public'));

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);

})

// Routes

app.get('/', (req, res) => {
    res.send('Movies API Server!')
})

app.use('/movies', moviesRouter)

app.use(serverError)

app.use(error_404)

