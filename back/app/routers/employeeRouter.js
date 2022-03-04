const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();

/**
 * @typedef {object} AffectedStatusBody
 * @property {number} statusId.required - ID of the status
 * @property {number} teamId.request.body - ID of the replacement team
 * @property {string} comment.request.body - Comment of the affected status
 */

router.route('/:id/date/:date')
  /**
   * POST /employee/{id}/date/{date}
   * @summary Assign a new status on an employee for a dedicated date
   *  -- NOTE : Only admins are allowed to use this route
   * @tags Affected status
   * @param {number}  id.path.required - id of the user
   * @param {string}  date.path.required - date for the affectation eq: 2022-01-01
   * @param {AffectedStatusBody} request.body.required - JSON
   * @return {Affected_status} 200 - Affected status created
   */
  .post(adminAuth, controllerHandler(controller.addStatusOnAnEmployee))
  /**
   * PATCH /employee/{id}/date/{date}
   * @summary Update the status of an employee for a dedicated date
   *  -- NOTE : Only admins are allowed to use this route
   * @tags Affected status
   * @param {number}  id.path.required - id of the user
   * @param {string}  date.path.required - date for the affectation eq: 2022-01-01
   * @param {AffectedStatusBody} request.body.required - JSON
   * @return {string} 200 - Update is done
   */
  .patch(adminAuth, controllerHandler(controller.updateStatusOfAnEmployee))
  /**
   * DELETE /employee/{id}/date/{date}
   * @summary Delete the status of an employee for a dedicated date
   *  -- NOTE : Only admins are allowed to use this route
   * @tags Affected status
   * @param {number}  id.path.required - id of the employee
   * @param {string}  date.path.required - date for the affectation eq: 2022-01-01
   * @return {string} 200 - delete is done
   */
  .delete(adminAuth, controllerHandler(controller.deleteStatusOfAnEmployee));

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

/**
* GET /employee
* @summary Get all employees data from the database.
* -- NOTE : This route require a valid JSON web token into the HTTP request header.
* @tags Employee
* @param {string} request.body.required - JSON Web Token
* @return {Employee} 200 - success response - application/json
*/
router.get('/', auth, controllerHandler(controller.getAllEmployee));

router.get('/hashAllEmployeePassword', controllerHandler(controller.hashAllEmployeePassword));

module.exports = router;
