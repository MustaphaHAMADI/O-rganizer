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

  async updateEmployee(employee) {
    // console.log('employee', employee);
    const result = await client.query(
      `UPDATE "employee" 
        SET 
          "reg_number" = $1, 
          "name" = $2, 
          "lastname" = $3 , 
          "role" = $4, 
          "password" = $5, 
          "function" = $6, 
          "profile_picture" = $7, 
          "team_id" = $8
        WHERE 
          "id"= $9 ;`,
      [
        employee.reg_number,
        employee.name,
        employee.lastname,
        employee.role,
        employee.password,
        employee.function,
        employee.profile_picture,
        employee.team_id,
        employee.id,
      ],
    );
    return result.rows[0];
  },
};
