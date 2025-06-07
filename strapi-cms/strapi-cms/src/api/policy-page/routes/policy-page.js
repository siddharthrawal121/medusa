'use strict';

/**
 * policy-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::policy-page.policy-page', {
  config: {
    find: {
      auth: false, // Allow public access to find (get the single type content)
    }
  },
});
