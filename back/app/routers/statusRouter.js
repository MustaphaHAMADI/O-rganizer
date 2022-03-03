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

router.route('/:id')
/**
* GET /status/{id}
* @summary Get one status.
* -- NOTE : This route require a valid JSON web token into the HTTP request header.
* @tags Status
* @param {number}  id.path.required - id of the status
* @return {Status} 200 - success response - application/json
 */
  .get(auth, controllerHandler(controller.getOneStatusByID));

module.exports = router;
