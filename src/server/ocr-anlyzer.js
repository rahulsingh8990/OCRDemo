var AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  // Input for textract can be byte array or S3 object
console.log(event);
  AWS.config.region = "us-east-1";
  //AWS.config.update({ region: 'us-east-1' });
  var textract = new AWS.Textract({ apiVersion: "2018-06-27" });
  //var textract = new AWS.Textract();
  console.log(textract);

  var params = {
    Document: {
      /* required */
      //'Bytes': imageBase64
      S3Object: {
        Bucket: "react-ap-webapp-images",
        Name: event
      }
    }
  };

  const data = await textract.detectDocumentText(params).promise();
   var res ={
          "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json"
                }
            };
            res.body = data;
  return res;
};