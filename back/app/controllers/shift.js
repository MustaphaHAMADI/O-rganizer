const models = require('../models');

module.exports = {
  /**
   * Method used to add a new shift in the database
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

  /**
   * Controller used to update one shift
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async updateShift(req, res) {
    const { body } = req;

    body.teams.forEach(async (element) => {
      await models.updateShift(body.date, element.team_id, element.shift);
    });

    return res.status(200).json('shifts modifiés');
  },

  /**
   * Controller used to delete a shift in the database
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async deleteShift(req, res) {
    const { body } = req;
    await models.deleteShift(body.date);

    return res.status(200).json('shifts supprimés');
  },
};
