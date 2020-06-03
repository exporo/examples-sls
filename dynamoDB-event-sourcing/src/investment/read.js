'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  convertEmptyValues: true,
});

module.exports.handler = async event => {

  const params = {
    TableName: process.env['DYNAMODB_INVESTMENT_TABLE'],
    KeyConditionExpression: 'investment_id = :investment_id',
    ExpressionAttributeValues: {
      ':investment_id': parseInt(event.pathParameters.id),
    },
    ScanIndexForward: false,
    Limit: 1,
  };

  const data = await docClient.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data.Items[0]),
  };
};
