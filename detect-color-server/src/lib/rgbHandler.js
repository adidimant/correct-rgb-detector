const _ = require('lodash');
const colorTagApi = require('../api/colorTag');
const { base64 } = require('../lib/utils');

// Offer - implement 5 parralal api calls from different sources and average the rgb result

const estimateRgb = async (buffer) => {
    const response = await colorTagApi.getDominatedRgb(base64(buffer));
    return response;
};

module.exports = { estimateRgb };