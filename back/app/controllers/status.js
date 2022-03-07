const models = require('../models');

module.exports = {
  /**
   * Controller used to send back all the status
   * @param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async getAllStatus(_, res) {
    const status = await models.getAllStatus();
    return res.json(status);
  },

  /**
   * Controller used to send back one status
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async getOneStatusByID(req, res) {
    const id = Number(req.params.id);
    const status = await models.getOneStatus(id);
    if (!status) {
      return res.status(400).send('this status does not exist');
    }
    return res.json(status);
  },
};
