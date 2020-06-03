'use strict';

module.exports.handler = async event => {
  throw Error('Force DLQ');
};
