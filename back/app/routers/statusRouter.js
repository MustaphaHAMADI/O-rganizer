const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();

/**
* GET /status
* @summary Get all status data from the database.
* -- NOTE : This route require a valid JSON web token into the HTTP request header.
* @tags Status
* @return {Status} 200 - success response - application/json
 */
router.get('/', auth, controllerHandler(controller.getAllStatus));

module.exports = router;
