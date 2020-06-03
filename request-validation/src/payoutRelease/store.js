'use strict';

const Joi = require('@hapi/joi');


module.exports.handler = async event => {

  const payload = JSON.parse(event.body);

  const rules = Joi.object().keys({
    type: Joi.valid('create', 'update').required(),
    userId: Joi.number().required(),
  });

  const result = rules.validate(payload, {
    abortEarly: false,
  });

  if (result.error) {
    return {
      statusCode: 422,
      body: JSON.stringify(result.error.details)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Data successfully received!',
      }
    ),
  };
};
