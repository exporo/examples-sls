# Why DLQ in combindation with AWS Event Bridge

Q: "So we typically, especially we have downstream services that might not scale as much as our Lambda functions would, we would put a queue or Kinesis stream or some way to buffer those events. There's no event buffering yet, right in EventBridge? You would still use something like SQS if you did need to buffer events."

A: "So using SQS as that kind of simple queue that gives you gives you that message durability, and all of the delivery and that dead letter queue semantics. But then using a EventBridge to really manage kind of the message routing and filtering pieces, which is where really it kind of excels. So super common pattern there, definitely."

https://www.serverlesschats.com/5

--

* This plugin is used to automatically generate DLQs without manually putting it as a resource for each function  
https://www.serverless.com/plugins/serverless-plugin-lambda-dead-letter/

* Here some information about Event Bridge in combination with the Serverless Framework  
https://www.serverless.com/framework/docs/providers/aws/events/event-bridge/



* As you can see in this file(./src/salesforce/functions.yml), the automatic referencing from the cloudformation script does not work properly
https://github.com/serverless/serverless/issues/7063
