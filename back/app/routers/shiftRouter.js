const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');

const router = express.Router();

/**
 * @typedef {object} teamDef
 * @property {number} team_id.required - ID of the team
 * @property {string} label.required - Label of the shift
 */

/**
 * @typedef {object} shiftBody
 * @property {string} date.request.body - ID of the replacement team
 * @property {array<teamDef>} teams.request.body - Comment of the shift
 */

router.route('/')
  /**
  * POST /shift
  * @summary Add a new shift.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Shift
  * @param {shiftBody} request.body.required - JSON
  * @return {string} 200 - success response - application/json
 */
  .post(adminAuth, controllerHandler(controller.shiftController.addShift))
  /**
  * PATCH /shift
  * @summary Update a shift.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Shift
  * @param {shiftBody} request.body.required - JSON
  * @return {string} 200 - success response - application/json
 */
  .patch(adminAuth, controllerHandler(controller.shiftController.updateShift))
  /**
  * DELETE /shift
  * @summary delete a shift.
  * -- NOTE : This route require a valid JSON web token into the HTTP request header.
  * @tags Shift
  * @param {number} id.body.required - Id of the shift to be deleted
  * @return {string} 200 - delete is done
 */
  .delete(adminAuth, controllerHandler(controller.shiftController.deleteShift));

module.exports = router;
