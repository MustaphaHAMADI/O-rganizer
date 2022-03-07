const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
// const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();
/**
 * @typedef {object} Team
 * @property {number} id - ID of the team
 * @property {string} team - name of the team
 * @property {array<employee>} employees - all employees composing the team
 */

/**
 * @typedef {object} employee
 * @property {number} id - ID of the employee
 * @property {string} firstName - employee's first name
 * @property {string} lastName - employee's lastname
 */
/**
* GET /team
* @summary Get all teams, and all employees in the team
* @tags Team
* @return {array<Team>} 200 - success response - application/json
*/
router.get('/', auth, controllerHandler(controller.teamController.getAllTeamWithMembers));

module.exports = router;
