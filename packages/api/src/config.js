module.exports = {
  enviorment: process.env.ENVIORMENT || 'development',
  port: process.env.PORT || 80,
  adminEmail: process.env.ADMIN_EMAIL || 'dev@dev.com',
  dbLocation: process.env.MONGODB_URI || 'mongodb://mongodb:27017/webshop',
  dbPayloadLimit: '2000kb',
  hashRounds: process.env.HASH_ROUNDS || 10,
  tokenSecret: process.env.TOKEN_SECRET || 'morello',
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || '1 day',
  mediaUrl: process.env.MEDIA_URL || 'media.webshop.oskarssylwan.com'
}
