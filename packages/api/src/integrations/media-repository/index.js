const S3 = require('aws-sdk/clients/s3');
const config = require('../../config.js');

const createDevImageRepository = () => ({
  upload: (_, fn) => {
    console.log('@createDevImageRepository upload')
    fn('https://source.unsplash.com/random/350x350')
  }
})

const createProdImageRepository = () => ({
  upload: (image, fn) => {
    const s3 = new S3()
    const params = {
      Bucket: 'media.webshop.oskarssylwan.com',
      Key: image.fileName,
      Body: image.data
    };
    s3.upload(params, function(err, data) {
      console.log(err, data);
      fn(data.Location)
    });
  }
})

const createImageRepository = config =>
  config.enviorment === 'production'
    ? createProdImageRepository(config)
    : createDevImageRepository(config)

module.exports = createImageRepository(config)
