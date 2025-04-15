const router = require('express').Router()
const controller = require('../controller/movie_controller')

// Index
router.get('/', controller.index)


// Show
router.get('/:id', controller.show)

module.exports = router