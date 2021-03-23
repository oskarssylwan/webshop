const S3 = require('aws-sdk/clients/s3')
const config = require('../../config.js')

const createDevImageRepository = () => ({
  upload: (_, fn) => {
    fn('https://source.unsplash.com/random/350x350')
  }
})

const createProdImageRepository = () => ({
  upload: (image, fn) => {
    const s3 = new S3()

    const params = {
      Bucket: config.mediaUrl,
      Key: image.fileName,
      Body: Buffer.from(image.data.split(',')[1], 'base64'),
      ContentType: 'image/png',
      ACL: 'public-read'
    }
    s3.upload(params, (err, data) => {
      fn(data.Location)
    })
  }
})

const createImageRepository = config =>
  config.enviorment === 'production'
    ? createProdImageRepository(config)
    : createDevImageRepository(config)

module.exports = createImageRepository(config)
