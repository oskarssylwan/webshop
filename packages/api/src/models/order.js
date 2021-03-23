const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  madeBy: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: [{
      itemId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
