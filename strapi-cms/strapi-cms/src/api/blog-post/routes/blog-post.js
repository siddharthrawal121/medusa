'use strict';

/**
 * blog-post router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::blog-post.blog-post', {
  config: {
    find: {
      auth: false, // Allow public access to find (list)
    },
    findOne: {
      auth: false, // Allow public access to findOne (single entry)
    },
  },
});
