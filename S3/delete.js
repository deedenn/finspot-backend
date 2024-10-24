const { DeleteObjectOutput, DeleteObjectRequest } = require('aws-sdk/clients/s3');
const { AWSError } = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3')
const Connect = require('./connection');

async function Delete(bucket, objectName, path) {
  return new Promise < DeleteObjectOutput > ((resolve, reject) => {
    const s3 = Connect(path);
    const params = { Bucket: bucket, Key: objectName };
    s3.deleteObject(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = {
  Delete
};