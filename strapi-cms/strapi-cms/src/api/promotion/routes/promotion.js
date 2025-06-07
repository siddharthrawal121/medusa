'use strict';

/**
 * promotion router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::promotion.promotion', {
  config: {
    find: {
      auth: false, // Allow public access to find (list)
    },
    findOne: {
      auth: false, // Allow public access to findOne (single entry)
    },
  },
});
