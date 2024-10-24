const { PutObjectOutput, PutObjectRequest } = require('aws-sdk/clients/s3');
const { AWSError } = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3')
const Connect = require('./connection');

async function Upload(bucket, file, objectName, path) {
  return new Promise((resolve, reject) => {
    const s3 = Connect(path);
    const params = { Bucket: bucket, Key: objectName, Body: file.buffer, ACL: 'public-read', ContentType: file.mimetype };
    s3.putObject(params, (err, data) => {
      if (err) reject(err);
      resolve(`${process.env.S3_ENDPOINT_URL}${bucket}/${path}/${objectName}`);
    });
  });
}

module.exports = {
  Upload
};