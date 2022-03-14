const models = require('../models');

module.exports = {
  /**
   * Method used to return all teams with members nested
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all team with members
   */
  async addShift(req, res) {
    const { body } = req;
    for (const key of body) {
      if (Number(key) === 1 || Number(key) === 2 || Number(key) === 3 || Number(key) === 4 || Number(key) === 5) {
        await models.addShift(body.date, key, body[key]);
      }
    }

    return res.status(200).json('shifts ajoutés');
  },

  async updateShift(req, res) {
    const { body } = req;
    for (const key of body) {
      if (Number(key) === 1 || Number(key) === 2 || Number(key) === 3 || Number(key) === 4 || Number(key) === 5) {
        await models.updateShift(body.date, key, body[key]);
      }
    }

    return res.status(200).json('shifts modifiés');
  },

  async deleteShift(req, res) {
    const { body } = req;
    await models.deleteShift(body.date);

    return res.status(200).json('shifts supprimés');
  },
};
