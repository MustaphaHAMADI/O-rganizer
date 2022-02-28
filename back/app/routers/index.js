const express = require('express');

const controller = require('../controllers');
const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

router.get('/employee', controller.getAllEmployee);

router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});

module.exports = router;
