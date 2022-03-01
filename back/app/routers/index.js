const express = require('express');

const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

router.all('/', controller.home);

/**
* GET /employee
* @summary Get all employees
* @tags Employee
* @return {Employee} 200 - success response - application/json
*/
router.get('/employee', controllerHandler(controller.getAllEmployee));

router.get('/updateEmployee', controllerHandler(controller.updateAllEmployee));

router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});

module.exports = router;
