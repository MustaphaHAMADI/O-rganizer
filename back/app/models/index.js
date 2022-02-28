const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

  async getAllEmployee() {
    const result = await client.query('SELECT * FROM "employee";');

    return result.rows;
  },
};
