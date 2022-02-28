const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

/**
 * @typedef {object} Employee
 * @property {number} id - identifiant unique de la table
 * @property {string} reg_number - User code
 * @property {string} name - Employee firstname
 * @property {string} lastname - Employee lastname
 * @property {string} role - role of the user : user/admin
 * @property {string} password - Employee password
 * @property {string} function - Employee function
 * @property {string} profile_picture - URL of the profile picture
 * @property {number} team_id - id of the employee's team
 */

module.exports = {

  /**
   * Returning all employees without filter or order
   * @returns {Employee[]} - All employees in the database
   */
  async getAllEmployee() {
    const result = await client.query('SELECT * FROM "employee";');

    return result.rows;
  },
};
