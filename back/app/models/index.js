const client = require('../config/db');
const { getPlanning } = require('../controllers');
const {
  ApiError,
} = require('../errors/apiErrors');

/**
 * @typedef {object} Employee
 * @property {number} id - ID of the user
 * @property {string} reg_number - User code
 * @property {string} name - Employee firstname
 * @property {string} lastname - Employee lastname
 * @property {number} team_noun - Noun of the employee team
 * @property {string} role - role of the user : user/admin
 * @property {string} function - Employee function
 * @property {string} profile_picture - URL of the profile picture
 */

module.exports = {

  /**
   * Returning all employees without filter or order
   * @returns {Employee[]} - All employees in the database
   */
  async getAllEmployee() {
    const result = await client.query(`
    SELECT 
      employee.id, 
      employee.reg_number, 
      employee.name, 
      employee.lastname,
      team.noun as team_noun, 
      employee.role, 
      employee.function,
      employee.profile_picture 
    FROM 
      employee JOIN team 
      ON employee.team_id = team.id`);

    return result.rows;
  },

  /**
   * Returing one employee selected based on his reg_number
   * @param {string} regNumber - reg_number of the employee
   * @returns { Employee } - The finded employe
   */
  async findOneEmployeeByReg_number(regNumber) {
    const result = await client.query(
      'SELECT * FROM "employee" WHERE "reg_number"= $1',
      [regNumber],
    );

    return result.rows[0];
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

  async getAllTeam() {
    const result = await client.query(
      `SELECT
        "team"."id" as "id",
        "team"."noun" as team,
        array_agg("employee"."name" || ' ' || "employee"."lastname") as employees
      FROM
        team
      JOIN
        employee on employee.team_id = team.id
      GROUP BY
        "team"."noun", "team"."id"
      ORDER BY
        "team"."noun"`,
    );

    return result.rows;
  },
};
