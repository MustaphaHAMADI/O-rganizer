const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();

/**
* GET /employee
* @summary Get all employees data from the database.
* -- NOTE : This route require a valid JSON web token into the HTTP request header.
* @tags Employee
* @param {string} request.body.required - JSON Web Token
* @return {Employee} 200 - success response - application/json
*/
router.get('/', auth, controllerHandler(controller.getAllEmployee));

router.get('/team', controllerHandler(controller.getAllTeam));

router.get('/hashAllEmployeePassword', controllerHandler(controller.hashAllEmployeePassword));

module.exports = router;
