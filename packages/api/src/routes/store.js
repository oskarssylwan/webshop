const express = require('express')
const middleware = require('../middleware')
const controller = require('../controllers/orders.js')
const router = express.Router()

router.get('/', middleware.protectedRoute, controller.getOrders)
router.get('/:userID', middleware.protectedRoute, controller.getUserOrders)
router.post('/checkout', middleware.protectedRoute, controller.createOrder)

module.exports = router
