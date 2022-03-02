const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();


router.route('/:id/date/:date')
/**
 * POST /employee/{id}/date/{date}
 * @summary Assign a new status on an employee for a dedicated date
 * @tags Employee
 * @param {number}  id.path.required - id of the user
 * @param {string}  date.path.required - date for the affectation eq: 2022-01-01
 * @param {number} status_id.request.body.required - ID of the status
 * @param {number} team_id.request.body - ID of the replacement team
 * @param {string} comment.request.body - ID of the status
 * @return {Affected_status} 200 - Affected status created
 */
.post(controllerHandler(controller.addStatusOnAnEmployee));

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
