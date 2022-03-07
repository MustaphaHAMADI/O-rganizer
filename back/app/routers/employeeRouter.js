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
  .get(auth, controllerHandler(controller.employeeController.getAllEmployee))
  /**
   * POST /employee
   * @summary Add an employee in the database
   * @tags Employee
   * @param {addEmployeeBody} request.body.required - JSON
   * @return {object} - 200 - JSON : created employee
   */
  .post(adminAuth, controllerHandler(controller.employeeController.addEmployee));

router.get('/hashAllEmployeePassword', controllerHandler(controller.employeeController.hashAllEmployeePassword));

router.route('/:id(\\d+)')
  /**
  * GET /employee/{id}
  * @summary Get an employee data from the database based in his ID.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Employee
  * @param {number} id.path.required - id of the employee
  * @return {Employee} 200 - success response - application/json
   */
  .get(auth, controllerHandler(controller.employeeController.getOneEmployeeById))
  /**
   * DELETE /employee/{id}
   * @summary Delete an employee from the database based in his ID.
   * -- NOTE : This route require a valid JSON web token into the HTTP request header.
   * @tags Employee
   * @param {number} id.path.required - id of the employee
   * @return {Employee} 200 - success response - delete iis done
   */
  .delete(auth, controllerHandler(controller.employeeController.deleteEmployee))
  /**
   * PATCH /employee/{id}
   * @summary Update an employee from the database based in his ID.
   * -- NOTE : This route require a valid JSON web token into the HTTP request header.
   * @tags Employee
   * @param {number} id.path.required - id of the employee
   * @param {EmployeeWithPassword} request.body - JSON of the dataset to be uptaded for the employee
   * @return {Employee} 200 - success response - update is done
   */
  .patch(auth, controllerHandler(controller.employeeController.updateEmployee));

module.exports = router;
