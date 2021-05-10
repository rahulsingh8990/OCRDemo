const AWS = require('aws-sdk');
var s3 = new AWS.S3();


exports.handler = async (event, context, callback) => {
        let recieved_request =JSON.stringify(event.img);
        let recieved_request_imageId =JSON.stringify(event.imageID);
        let recieved_request_ext =JSON.stringify(event.fileExt);
        let recieved_request_folder =JSON.stringify(event.folder);
    
        recieved_request=  recieved_request.slice(1, -1);
        var filePath = recieved_request_imageId + "." + recieved_request_ext.replace('"','').replace('"','');
        let buffer = Buffer.from(recieved_request.replace(/^data:image\/\w+;base64,/, ""),'base64'); 
        
        
      
          AWS.config.region = "us-east-1";
  //AWS.config.update({ region: 'us-east-1' });
  var textract = new AWS.Textract({ apiVersion: "2018-06-27" });
  //var textract = new AWS.Textract();
  console.log(textract);
     
     var params = {
    Document: {
      /* required */
      'Bytes': buffer
    
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