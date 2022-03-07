const models = require('../models');

module.exports = {
  /**
   * Controller used to register a new affected_status,
   * before the insertion in the database, we verify if an affected_status already exist
   * for the employee on the dedicated date.
   *@param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON the new affected_status created
   */
  async addStatusOnAnEmployee(req, res) {
    const {
      id,
      date,
    } = req.params;

    const {
      statusId,
      teamId,
      comment,
    } = req.body;

    const employee = await models.getOneEmployeeById(id);

    if (!employee) {
      return res.status(400).send('This employee ID does not exist');
    }

    if (employee.team_id === null || employee.team_id === '') {
      return res.status(400).send('Can\'t affect status to an employee without a team');
    }
    const isThereAStatus = await models.getStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length !== 0) {
      return res.status(400).send('A status is already affected to this employee for this date');
    }

    const verifiedStatus = await models.getOneStatus(statusId);

    if (!verifiedStatus) {
      return res.status(400).send(`The status code ${statusId} does not exist`);
    }

    const post = await models.addStatusToEmployee(id, date, statusId, teamId, comment);

    const result = await models.getOneAffectedStatusById(post.id);

    return res.status(200).json(result);
  },

  /**
   * Controller used to update an affected_status,
   * before the insertion in the database, we verify if an affected_status already exist
   * for the employee on the dedicated date.
   *@param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON confirmation of the operation
   */
  async updateStatusOfAnEmployee(req, res) {
    const {
      id,
      date,
    } = req.params;

    const {
      statusId,
      teamId,
      comment,
    } = req.body;

    const employee = await models.getOneEmployeeById(id);

    if (!employee) {
      return res.status(400).send('This employee ID does not exist');
    }

    const isThereAStatus = await models.getStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length === 0) {
      return res.status(400).send('no status exists for this employee on this date');
    }

    const verifiedStatus = await models.getOneStatus(statusId);

    if (!verifiedStatus) {
      return res.status(400).send(`The status code ${statusId} does not exist`);
    }

    await models.updateStatusToEmployee(id, date, statusId, teamId, comment);

    return res.status(200).send('update is done');
  },

  /**
   * Controller used to delete an affected_status
   *@param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON confirmation of the operation
   */
  async deleteStatusOfAnEmployee(req, res) {
    const id = Number(req.params.id);
    const {
      date,
    } = req.params;

    const employee = await models.getOneEmployeeById(id);

    if (!employee) {
      return res.status(400).send('This employee ID does not exist');
    }

    const isThereAStatus = await models.getStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length === 0) {
      return res.status(400).send('no status exists for this employee on this date');
    }

    await models.deleteStatusToEmployee(id, date);

    return res.status(200).send('delete is done');
  },

};
