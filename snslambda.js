//Lambda Function listens to SNS
//and posts to dynamodb one record at a time

//we expect the payload of the SNS to be a time string like "20150422220852"

console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
 
exports.handler = function(event, context) {
    
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "EdisonMaracas-DeviceDataTable-6S2INYN5CN1E";
    var datetime = new Date().getTime().toString();

    event.Records.forEach(function(record) {
        //asciidata = new Buffer(record.Sns.Message, 'base64').toString('ascii');
        //payload = asciidata.toString();
        payload = record.Sns.Message.toString('ascii');
        console.log("Decoded Data:", payload);
  
        dynamodb.putItem({
            "TableName": tableName,
            "Item" : {
                "device_id": {"S": "unknown" },
                "time": {"N": payload },
                "device": {"S": "unknown" },
                "source": {"S": "SNS through lambda" }
            }
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Putting item into dynamodb failed: '+err);
            }
            else {
                console.log('great success: '+JSON.stringify(data, null, '  '));
                context.succeed('SUCCESS');
            }
        });
    });
};
