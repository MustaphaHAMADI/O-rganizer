const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');

const router = express.Router();

router.route('/')
  .post(adminAuth, controllerHandler(controller.shiftController.addShift))
  .patch(adminAuth, controllerHandler(controller.shiftController.updateShift))
  .delete(adminAuth, controllerHandler(controller.shiftController.deleteShift));

module.exports = router;
