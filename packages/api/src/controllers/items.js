const Item = require('../models/item');
const config = require('../config');
const ImageRepository = require('../integrations/media-repository');
const { nanoid } = require('nanoid');

const methods = {

  // Param Id Methods
  findItem: function(req, res, next, id) {
    Item.findById(id, (error, item) => {
      if (error) return next(error);
      if (!item) return next(new Error('Item could not be found'));
      req.item = item;
      return next();
    });
  },

  // Route Methods
  getItemsByCategory: function(req, res, next) {
    if (!req.query.categories) return next(new Error('No category specified'));
    Item.find({ categories: { $in: req.query.categories.split(',')}}, (error, items) => {
        if (error) return next(error);
        if (items.length <= 0) return next(new Error('No items found'));
        res.json(items);
      }
     );
  },

  getItemsByIDs: function(req, res, next) {
    if (!req.query.itemIDs) return next(new Error('No category specified'));
    Item.find({ _id: { $in: req.query.itemIDs.split(',')}}, (error, items) => {
        if (error) return next(error);
        if (items.length <= 0) return next(new Error('No items found'));
        res.json(items);
      }
     );
  },

  getItems: function(req, res, next) {
    if(req.query.itemIDs) {
      methods.getItemsByIDs(req, res, next);
    } else if (req.query.categories) {
      methods.getItemsByCategory(req, res, next);
    } else {
      Item.find({}, (error, items) => {
          if (error) return next(error);
          if (items.length <= 0) return next(new Error('No items found'));
          res.json(items);
        }
      );
    }
  },

  getItem: function(req, res, next) {
    res.json({
      success: true,
      message: 'Item retrieved successfully!',
      item: req.item
    })
  },

  createItem: function(req, res, next) {
    if (req.token_decoded.user_group === 'admin') {

      ImageRepository.upload({
        fileName: `${nanoid()}${req.body.imageFormat}`,
        data: req.body.image
      }, imageUrl => {
        console.log('@createItem callback')
        const item = new Item(req.body);
        item.image = imageUrl;
        item.save((error, itemEntry) => {
          console.log('@createItem save item')
          if (error) next(error);
          res.json({
            success: true,
            message: 'Item created successfully!',
            item: item
          });
        })
      })
    } else {
      const err = new Error('Access denied');
      return next(err);
    }
  },

  updateItem: function(req, res, next) {
    if (req.token_decoded.user_group === 'admin') {
      req.item.set(req.body);
      req.item.save((error, item) => {
        if (error) return next(error);

        res.json({
          success: true,
          message: 'Item updated successfully!',
          item: item
        });
      });
    } else {
      const err = new Error('Access denied');
      return next(err);
    }
  },

  deleteItem: function(req, res, next) {
    if (req.token_decoded.user_group === 'admin') {
      req.item.remove(error => {
        if (error) return next(error);
        res.json({
          success: true,
          message: "Item removed"
        });
      })
    } else {
      const err = new Error('Access denied');
      return next(err);
    }
  }

};

module.exports = methods;
