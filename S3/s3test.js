const fs = require('fs');
const AWS = require('aws-sdk');


// DateKey = HMAC-SHA256("AWS4"+"<SecretKey>", "<YYYYMMDD>")
// DateRegionKey = HMAC-SHA256(<DateKey>, "<aws-region>")
// DateRegionServiceKey = HMAC-SHA256(<DateRegionKey>, "<aws-service>")
// SigningKey = HMAC-SHA256(<DateRegionServiceKey>, "aws4_request")

const crypto = require('crypto');

function cryptoFunc(signinKey, stringToSign) {
  // Ключ подписи (замените на свой собственный секретный ключ)
  const signingKeys = Buffer.from(signinKey, 'utf8');

  // Строка для подписи (замените на свои данные)
  //const stringToSign = 'Привет';


  // Вычисление подписи с помощью HMAC-SHA256
  const hmac = crypto.createHmac('sha256', signingKeys);
  hmac.update(stringToSign);
  const signature = hmac.digest('hex');
  console.log(signature);
  return signature;
}

const dataKey = cryptoFunc(`AWS4 + ckXRuSSCvI82SMxx3jB2wmJbHIEEBGQWyVuEXU2W`, new Date().getDate() + '');
const dataRegionKey = cryptoFunc(dataKey, 'ru-1');
const dateRegionServiceKey = cryptoFunc(dataRegionKey, 'https://s3.timeweb.com');
const signinKey = cryptoFunc(dateRegionServiceKey, "aws4_request");

console.log('Signikey: ', signinKey);

// Enter copied or downloaded access id and secret here
const ID = 'EMZ6N4I2VAL2CDW1NMO8';
const SECRET = 'ckXRuSSCvI82SMxx3jB2wmJbHIEEBGQWyVuEXU2W';

// Enter the name of the bucket that you have created here
const BUCKET_NAME = 'b8c3b9aa-finspot-test';;


// Initializing S3 Interface
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  endpoint: 'https://s3.timeweb.com',
  s3ForcePathStyle: true,
  region: 'ru-1',
  apiVersion: 'latest',
});

console.log('s3: ', s3);

const uploadFile = (fileName) => {
  // read content from the file
  const fileContent = fs.readFileSync(fileName);

  // setting up s3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'sample.txt', // file name you want to save as
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err
    }
    console.log(`File uploaded successfully. ${data.Location}`)
  });
};

// Enter the file you want to upload here
uploadFile('sample.txt');