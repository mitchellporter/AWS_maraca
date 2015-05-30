# AWS_maraca
Log IoT data on AWS 3 different ways: 
1. direct to DynamoDB, 
2. through Kinesis and Lambda to DynamoDB, and 
3. through SNS and Lambda to DynamoDB.

At a AWS IoT (Internet of Things) workshop I built a "maraca" using an Intel Edison board,
an arduino "Base Shield" (breakout board) and some sensors.  The maraca part is a 3D 
accelerometer: when you shake it the Arduino Sketch calls AWS libraries to send a small
data packet to AWS.  The example code had 3 different ways to send the data to AWS;
however there was easy way to see the packet when sent to SNS.

I wrote a simple Lambda function to write to DynamoDB whenever a SNS message came in.

References:
- assembling the Intel Edison maraca: http://slides.com/rexstjohn/deck-6-8-7-8#/17
- sending maraca data to AWS: http://bit.ly/aws-iot-hackseries

