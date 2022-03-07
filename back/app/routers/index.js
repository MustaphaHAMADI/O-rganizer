const express = require('express');

const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const employeeRouter = require('./employeeRouter');
const affectedStatus = require('./affectedStatusRouter');
const statusRouter = require('./statusRouter');
const teamRouter = require('./teamRouter');
const { errorHandler } = require('../helpers/errorHandler');
const auth = require('../helpers/auth');

const router = express.Router();

/**
 * @typedef {object} loginBody
 * @property {string} regNumber.required - reg_number of the user
 * @property {string} password.required - password of the user
 */

/**
 * Redirect the main route on the api-docs route
 */
router.all('/', controller.mainController.home);

/**
 * Redirection to the employeeRouter all the routes start with /employee
 */
router.use('/affectedStatus', affectedStatus);

/**
 * Redirection to the employeeRouter all the routes start with /employee
 */
router.use('/employee', employeeRouter);

/**
 * Redirection to the statusRouter all the routes start with /status
 */
router.use('/status', statusRouter);

/**
 * Redirection to the teamRouter all the routes start with /team
 */
router.use('/team', teamRouter);

/**
 * POST /login
 * @summary Login of the user
 * @tags Login
 * @param {loginBody} request.body.required - JSON include reg_number and password of the employee
 * @return {Employee} 200 - sucess response - application/json
 */
router.post('/login', controllerHandler(controller.mainController.login));

/**
 * @typedef {object} day - created for every day in the database
 * @property {string} date - date of the day format : yyyy-mm-dd
 * @property {array<planningTeam>} teams - every teams for this day
 */

/**
 * @typedef {object} planningTeam - one team with planning infos
 * @property {number} teamId - id of the team
 * @property {string} team - name of the team
 * @property {string} shift - M : matin AM : apres-midi N : nuit stays blank if team doesn't work
 * @property {array<planningStatus>} status - only appears if en employee of the team has a status
 */

/**
 * @typedef {object} planningStatus - only appears if en employee of the team has a status
 * @property {number} statusId - id of the status
 * @property {string} firstName - employee affected by status first name
 * @property {string} lastName - employee affected by status lastname
 * @property {string} status - status label
 */

/**
 * GET /planning
 * @summary get the full planning
 * @tags Planning
 * @return {array<day>} 200 - sucess response - application/json
 */

router.get('/planning', auth, controllerHandler(controller.mainController.getPlanning));

/**
 * Using the errorHanlder to manage the specific error messages
 */
router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});

module.exports = router;
