require('dotenv').config();

const multer = require('multer');

const { PORT = 3000 } = process.env;
const Upload = require('./S3/upload');
const Delete = require('./S3/delete');
const express = require('express');
const { prototype } = require('aws-sdk/clients/appstream');

const app = express();

// Endpoint for uploading a file
app.post(
  '/upload',
  multer().single('formFile'),
  async (req, res) => {
    if (!req.file) res.status(400).send('Bad Request: No file was uploaded');
    // If you want to retain the original filename and extension just use originalname like below
    // const filename: string = req.file.originalname;
    const fileExtension = req.file.originalname.split('.').pop();
    const filename = `my-custom-filename.${fileExtension}`;
    const url = await Upload(process.env.S3_BUCKET_NAME, req.file, filename, 'images/logo');
    res.status(201).send(url);
  });

// Endpoint for deleting file
app.delete(
  '/delete',
  async (req, res) => {
    const filename = req.query.filename?.toString();
    if (!filename) res.status(400).send('Bad Request: You must supply the \'filename\' query parameter');
    const pathToFile = req.query.path?.toString();
    await Delete(process.env.S3_BUCKET_NAME, filename, pathToFile);
    res.status(200).send();
  });

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});