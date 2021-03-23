const express = require('express')
const middleware = require('../middleware')
const controller = require('../controllers/items')
const router = express.Router()

router.param('itemID', controller.findItem)
router.get('/', controller.getItems)
router.get('/:itemID', controller.getItem)
router.post('/', middleware.protectedRoute, controller.createItem)
router.put('/:itemID', middleware.protectedRoute, controller.updateItem)
router.delete('/:itemID', middleware.protectedRoute, controller.deleteItem)

module.exports = router
