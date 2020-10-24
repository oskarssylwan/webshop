const S3 = require('aws-sdk/clients/s3');
const config = require('../../config.js');

const createDevImageRepository = () => ({
  upload: (_, fn) => {
    console.log('@createDevImageRepository upload')
    fn('https://source.unsplash.com/random/350x350')
  }
})

const createProdImageRepository = () => ({
  upload: () => {
    const params = {
      Bucket: 'media.webshop.oskarssylwan.com',
      Key: `${rand()}${req.body.imageFormat}`,
      Body: stream
    };
    s3.upload(params, function(err, data) {
      console.log(err, data);
    });
  }
})

const createImageRepository = config =>
  config.enviorment === 'production'
    ? createProdImageRepository(config)
    : createDevImageRepository(config)

module.exports = createImageRepository(config)
