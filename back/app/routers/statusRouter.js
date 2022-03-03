const express = require('express');
const controller = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const adminAuth = require('../helpers/adminAuth');
const auth = require('../helpers/auth');

const router = express.Router();

/**
 * @typedef {object} AffectedStatusBody
 * @property {number} statusId.required - ID of the status
 * @property {number} teamId.request.body - ID of the replacement team
 * @property {string} comment.request.body - Comment of the affected status
 */


 module.exports = router;