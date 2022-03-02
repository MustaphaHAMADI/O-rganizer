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

/**
 * @typedef {object} Affected_status
 * @property {number} employee_id - ID of the affected Status
 * @property {string} date - Date of the affectation
 * @property {number} employee_id - ID of the employee
 * @property {number} status_id - ID of the status
 * @property {number} team_id - ID of the replacement team
 * @property {string} comment - Comment of the affected status
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
   * @returns { Employee } - The finded employee
   */
  async findOneEmployeeByReg_number(regNumber) {
    const result = await client.query(
      'SELECT * FROM "employee" WHERE "reg_number"= $1',
      [regNumber],
    );

    return result.rows[0];
  },

  /**
   * Returing one employee selected based on his reg_number
   * @param {number} id - ID of the employee
   * @returns { Employee } - The finded employee
   */
  async findOneEmployeeByID(id) {
    const result = await client.query(
      'SELECT * FROM "employee" WHERE "id"= $1',
      [id],
    );

    return result.rows[0];
  },

  /**
   * Returning the status of a dedicated employee on a specific date
   * @param {number} id - ID of the employee
   * @param {string} date - Date of the affected status
   * @returns {Affected_status} - The list of the affected status of the employee for the date
   */
  async findStatusForAnEmployeeForADate(id, date) {
    const result = await client.query(
      'SELECT * FROM "affected_status" WHERE "employee_id"=$1 AND "date" = $2',
      [id, date],
    );
    // console.log("result.rows", result.rows);
    return result.rows;
  },

  /**
   * Assigns a status to an employee for a date
   * @param {number} id - ID of the employee
   * @param {string} date - Date of the assignement
   * @param {number} statusId - ID of the status to be assigned
   * @param {number} teamId - ID of the replacement team
   * @param {number} comment - Comment of the affected status
   * @returns {Affected_status} - The new affected status registered in the database
   */
  async addStatusToEmployee(id, date, statusId, teamId = null, comment = '') {
    const newStatus = await client.query(
      `INSERT INTO "affected_status" ("employee_id","date","status_id","team_id","comment") VALUES
      ($1,$2,$3,$4,$5) RETURNING *`,
      [
        id,
        date,
        statusId,
        teamId,
        comment],
    );
    return newStatus.rows[0];
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
