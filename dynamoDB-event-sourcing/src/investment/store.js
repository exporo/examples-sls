'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  convertEmptyValues: true,
});

module.exports.handler = async event => {

  const payload = JSON.parse(event.body);

  const params = {
    Item: {
      investment_id: parseInt(payload.id),
      timestamp: Date.now(),
      data: payload.data || {},
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: process.env['DYNAMODB_INVESTMENT_TABLE'],
  };

  const res = await docClient.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Data successfully received!',
        data: res
      }
    ),
  };
};
