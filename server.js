const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.listen(port, () => {
    console.log('Server is listening on http://localhost' + port);

})

app.use(express.json());

app.use(cors({
    origin: ''
}))