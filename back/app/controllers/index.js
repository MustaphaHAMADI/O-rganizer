const models = require('../models');

module.exports = {
  async getAllEmployee(_, res) {
    const employees = await models.getAllEmployee();

    return res.json(employees);
  },
};
