const models = require('../models');

module.exports = {

  /**
   * Default controller to show documention url.
   * ExpressMiddleware signature
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {string} Route JSON response
   */
  home(req, res) {
    const fullUrl = `${req.protocol}://${req.get('host')}`;
    return res.redirect(`${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`);
  },

  async getAllEmployee(_, res) {
    const employees = await models.getAllEmployee();

    return res.json(employees);
  },
};