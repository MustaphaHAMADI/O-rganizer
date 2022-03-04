const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();

/**
 * @typedef {object} addEmployeeBody
 * @property {string} regNumber.required - Reg Number of the employee
 * @property {string} password.required - Password
 * @property {string} role.required - Role : user / admin
 * @property {string} name - Name of the employee
 * @property {string} lastname - Last name of the employee
 * @property {string} profilePicture - Link of the profile picture of the employee
 * @property {number} teamId - ID of the employee team
 */

router.route('/')
  /**
  * GET /employee
  * @summary Get all employees data from the database.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Employee
  * @return {Employee} 200 - success response - application/json
  */
  .get(auth, controllerHandler(controller.getAllEmployee))
  /**
   * POST /employee
   * @summary Add an employee in the database
   * @tags Employee
   * @param {addEmployeeBody} request.body.required - JSON
   * @return {object} - 200 - JSON : created employee
   */
  .post(adminAuth, controllerHandler(controller.addEmployee));

router.get('/hashAllEmployeePassword', controllerHandler(controller.hashAllEmployeePassword));

router.route('/:id')
  /**
  * GET /employee/{id}
  * @summary Get an employee data from the database based in his ID.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Employee
  * @param {number} id.path.required - id of the employee
  * @return {Employee} 200 - success response - application/json
   */
  .get(auth, controllerHandler(controller.getOneEmployeeById));

module.exports = router;
