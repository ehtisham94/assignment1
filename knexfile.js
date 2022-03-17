// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
  },

  // testing: {
  //   client: 'pg',
  //   connection: process.env.DB_URL,
  // },

  // production: {
  //   client: 'pg',
  //   connection: process.env.DB_URL,
  // },
};