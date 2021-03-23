const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: {type: [String],
    default: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum, quam quis sollicitudin volutpat, mauris purus ullamcorper sapien.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum, quam quis sollicitudin volutpat, mauris purus ullamcorper sapien.'
    ]},
  origin: {type: String, default: 'USA'},
  material: {type: String, default: 'Cotton'},
  color: String,
  categories: [String],
  image: String
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
