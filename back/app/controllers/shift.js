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

    body.teams.forEach(async (element) => {
      await models.addShift(body.date, element.team_id, element.shift);
    });

    return res.status(200).json('shifts ajoutés');
  },

  async updateShift(req, res) {
    const { body } = req;

    body.teams.forEach(async (element) => {
      await models.addShift(body.date, element.team_id, element.shift);
    });

    return res.status(200).json('shifts modifiés');
  },

  async deleteShift(req, res) {
    const { body } = req;
    await models.deleteShift(body.date);

    return res.status(200).json('shifts supprimés');
  },
};
