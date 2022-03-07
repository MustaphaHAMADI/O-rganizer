const models = require('../models');

module.exports = {
  /**
   * Method used to return all teams with members nested
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all team with members
   */
  async getAllTeamWithMembers(_, res) {
    const teams = await models.getAllTeamWithMembers();

    return res.status(200).json(teams);
  },
};
