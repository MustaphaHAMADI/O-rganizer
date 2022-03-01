const express = require('express');

const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

/**
 * @typedef {object} loginBody
 * @property {string} regNumber.required - reg_number of the user
 * @property {string} password.required - password of the user
 */

router.all('/', controller.home);

/**
 * POST /login
 * @summary Login of the user
 * @tags Employee
 * @param {loginBody} request.body.required - JSON include reg_number and password of the employee
 * @return {Employee} 200 - sucess response - application/json
 */
router.post('/login', controllerHandler(controller.login));

/**
* GET /employee
* @summary Get all employees
* @tags Employee
* @return {Employee} 200 - success response - application/json
*/
router.get('/employee', controllerHandler(controller.getAllEmployee));

router.get('/hashAllEmployeePassword', controllerHandler(controller.hashAllEmployeePassword));

router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});

module.exports = router;
