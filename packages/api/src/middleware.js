const webToken = require('jsonwebtoken');
const config = require('./config')

function protected(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    webToken.verify(token, config.token_secret, (error, decoded) => {
      if (error)  {
         return next(error);
      } else {
        req.token_decoded = decoded;
        next();
      }
    });
  } else {
    const err = new Error('No token provided');
    err.status = 403;
    next(err);
  }
};

module.exports.protected = protected;
