const Order = require('../models/order')

module.exports = {

  getOrders: function(req, res, next) {
    if (req.tokenDecoded.userGroup === 'admin') {
      Order.find({}, (error, orders) => {
        if (error) {
          return next(error)
        } else {
          res.json({
            success: true,
            message: 'Orders retrieved successfully!',
            orders: orders
          })
        }
      })
    } else {
      const err = new Error('Access denied')
      return next(err)
    }
  },

  getUserOrders: function(req, res, next) {
    if (req.tokenDecoded.username === req.params.userID) {
      Order.find({ madeBy: req.params.userID }, (error, orders) => {
        if (error) {
          return next(error)
        } else if (!orders.length) {
          const err = new Error('No orders were found')
          return next(err)
        } else {
          res.json({
            success: true,
            message: 'Order(s) retrieved successfully!',
            orders: orders
          })
        }
      })
    } else {
      const err = new Error('Access denied')
      return next(err)
    }
  },

  createOrder:  function(req, res, next) {
    const order = new Order({
      madeBy: req.tokenDecoded.username,
      items: req.body.cart
    })

    order.save(order, (error) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          success: true,
          message: 'Order recieved successfully',
          order: order
        })
      }
    })
  }

}
