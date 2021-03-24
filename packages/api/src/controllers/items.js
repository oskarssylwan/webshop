const Item = require('../models/item')
const ImageRepository = require('../integrations/media-repository')
const { nanoid } = require('nanoid')

const methods = {

  // eslint-disable-next-line max-params
  findItem: function(req, res, next, id) {
    Item.findById(id, (error, item) => {
      if (error) return next(error)
      if (!item) return next(new Error('Item could not be found'))
      req.item = item
      return next()
    })
  },

  getItemsByCategory: function(req, res, next) {
    if (!req.query.categories) return next(new Error('No category specified'))
    Item.find({ categories: { $in: req.query.categories.split(',')}}, (error, items) => {
      if (error) return next(error)
      res.json(items || [])
    }
    )
  },

  getItemsByIDs: function(req, res, next) {
    if (!req.query.itemIds) return next(new Error('No category products specified'))
    Item.find({ _id: { $in: req.query.itemIds.split(',')}}, (error, items) => {
      if (error) return next(error)
      res.json(items || [])
    }
    )
  },

  getItems: function(req, res, next) {
    if (req.query.itemIDs) {
      methods.getItemsByIDs(req, res, next)
    } else if (req.query.categories) {
      methods.getItemsByCategory(req, res, next)
    } else {
      Item.find({}, (error, items) => {
        if (error) return next(error)
        res.json(items || [])
      }
      )
    }
  },

  getItem: function(req, res, next) {
    res.json(req.item)
  },

  createItem: function(req, res, next) {
    if (req.tokenDecoded.userGroup === 'admin') {

      ImageRepository.upload({
        fileName: `${nanoid()}${req.body.imageFormat}`,
        data: req.body.image
      }, imageUrl => {
        const item = new Item(req.body)
        item.image = imageUrl
        item.save(error => {
          if (error) next(error)
          res.json({
            success: true,
            message: 'Item created successfully!',
            item: item
          })
        })
      })
    } else {
      const err = new Error('Access denied')
      return next(err)
    }
  },

  updateItem: function(req, res, next) {
    if (req.tokenDecoded.userGroup === 'admin') {
      req.item.set(req.body)
      req.item.save((error, item) => {
        if (error) return next(error)

        res.json({
          success: true,
          message: 'Item updated successfully!',
          item: item
        })
      })
    } else {
      const err = new Error('Access denied')
      return next(err)
    }
  },

  deleteItem: function(req, res, next) {
    if (req.tokenDecoded.userGroup === 'admin') {
      req.item.remove(error => {
        if (error) return next(error)
        res.json({
          success: true,
          message: 'Item removed'
        })
      })
    } else {
      const err = new Error('Access denied')
      return next(err)
    }
  }

}

module.exports = methods
