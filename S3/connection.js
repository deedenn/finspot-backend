//import * as S3 from 'aws-sdk/clients/s3';
const S3 = require('aws-sdk/clients/s3')

// const s3 = new S3({
//   accessKeyId: 'EMZ6N4I2VAL2CDW1NMO8',
//   secretAccessKey: 'ckXRuSSCvI82SMxx3jB2wmJbHIEEBGQWyVuEXU2W',
//   endpoint: 'https://s3.timeweb.com',
//   s3ForcePathStyle: true,
//   region: 'ru-1',
//   apiVersion: 'latest',
// })

function Connect(path) {
  const S3 = new S3({
    apiVersion: 'latest',
    endpoint: `${process.env.S3_ENDPOINT_URL}${path}`,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
}

module.exports = {
  Connect
};