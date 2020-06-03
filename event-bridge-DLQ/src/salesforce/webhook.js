'use strict';

const AWS = require('aws-sdk');
const eventBridge = new AWS.EventBridge({
  region: process.env.AWS_REGION
});

module.exports.handler = async event => {

  const data = JSON.parse(event.body);

  const params = {
    Entries: [
      {
        EventBusName: process.env['SALESFORCE_EVENT_BRIDGE'],
        Source: 'exporo.salesforce.customer',
        DetailType: data.type,
        Detail: JSON.stringify(data),
      },
    ],
  };

  console.log('Event', params);

  const res = await eventBridge.putEvents(params).promise();

  if (res.FailedEntryCount > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Events NOT successfully emitted!',
        }
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Events successfully emitted!',
      }
    ),
  };
};
