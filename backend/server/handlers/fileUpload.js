const aws = require("aws-sdk");

// Configure AWS credentials
aws.config.update({
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: `${process.env.REGION}`
});

// Create an instance of the S3 service
const s3 = new aws.S3();

const fileUpload = (req, res) => {
  var base64data = new Buffer.from(req.file.buffer, 'binary');
  let fileLocation = ""
  const params = {
    Bucket: `${process.env.S3_BUCKET_NAME}`,
    Key: req.file.originalname,
    Body: base64data
  };
  return new Promise((resolve, reject) => {
      if (!req.file) {
        return reject("No file chosen!");
      }
s3.upload(params, (err, data) => {
  if (err) {
    console.error('Error uploading file:', err);
  } else {
    fileLocation = data.Location
  }
  resolve(fileLocation);
  })})
  
};


module.exports = fileUpload;
