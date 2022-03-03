const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllTeam, getAllStatus } = require('../models');
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

  /**
   * Controller used to hash all the passords on the employee table
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {string} Positive response of the hash
   */
  async hashAllEmployeePassword(req, res) {
    const employees = await models.getAllEmployee();

    employees.forEach(async (employee) => {
      const encryptedPassword = await bcrypt.hash(employee.password, 10);
      employee.password = encryptedPassword;
      await models.updateEmployee(employee);
    });

    return res.json('done');
  },

  /**
   * Controller used to show all the employee data
   * ExpressMiddleware signature :
   * @param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all the employees
   */
  async getAllEmployee(_, res) {
    const employees = await models.getAllEmployee();
    return res.json(employees);
  },

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

    const user = await models.findOneEmployeeByID(id);

    if (!user) {
      return res.status(400).send('This user ID does not exist');
    }

    const isThereAStatus = await models.findStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length !== 0) {
      return res.status(400).send('A status is already affected to this user for this date');
    }

    const verifiedStatus = await models.getOneStatus(statusId);

    if (!verifiedStatus) {
      return res.status(400).send(`The status code ${statusId} does not exist`);
    }

    const post = await models.addStatusToEmployee(id, date, statusId, teamId, comment);

    const result = await models.findOneAffectedStatusById(post.id);

    return res.status(200).json(result);
  },

  /**
   * Controller used to send back all the status
   * @param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async getAllStatus(_,res) {
    const status = await models.getAllStatus();
    return res.json(status);
  },

  /**
   * Controller used to send back one status
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns {object} JSON of all the status
   */
  async getOneStatusByID(req,res) {
    const { id } = req.params;
    const status = await models.getOneStatus(id);
    return res.json(status);
  },

  /**
   * Creation of the JSON web Token, the sign include the user role.
   * ExpressMiddleware signature :
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns {object} JSON of logged in user including token
   */
  async login(req, res) {
    const {
      regNumber,
      password,
    } = req.body;

    // Validate user input
    if (!(regNumber && password)) {
      res.status(400).send('All input are required');
    }
    // Validate if user exist in our database
    const user = await models.findOneEmployeeByReg_number(regNumber);

    // console.log('user', user);
    // const goodPassword = await bcrypt.compare(password, user.password);
    // console.log('goodPassword',goodPassword);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({
          user_id: user.regNumber,
          role: user.role,
        },
        process.env.TOKEN_KEY, {
          expiresIn: process.env.TOKEN_VALIDITY,
        },
      );

      // save user token
      user.token = token;

      // user
      delete user.password;
      delete user.created_at;
      delete user.updated_at;
      return res.status(200).json(user);
    }
    res.status(400).send('Invalid Credentials');
  },

  async getAllTeam(_, res) {
    const teams = await models.getAllTeam();

    return res.status(200).json(teams);
  },
};
