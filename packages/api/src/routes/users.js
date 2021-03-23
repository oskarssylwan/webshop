const express = require('express')
const middleware = require('../middleware')
const router = express.Router()
const controller = require('../controllers/users')

router.param('username', controller.findUser)
router.get('/:username', controller.getUser)
router.post('/', controller.createUser)
router.post('/authenticate', controller.authenticateUser)
router.put('/:username', middleware.protectedRoute, controller.updateUser)

module.exports = router
