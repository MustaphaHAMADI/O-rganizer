const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllShift, getAllAffectedStatus } = require('../models');
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
      return res.status(400).send('This employee ID does not exist');
    }

    const isThereAStatus = await models.findStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length !== 0) {
      return res.status(400).send('A status is already affected to this employee for this date');
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

    const user = await models.findOneEmployeeByID(id);

    if (!user) {
      return res.status(400).send('This employee ID does not exist');
    }

    const isThereAStatus = await models.findStatusForAnEmployeeForADate(id, date);

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
    const {
      id,
      date,
    } = req.params;

    const user = await models.findOneEmployeeByID(id);

    if (!user) {
      return res.status(400).send('This employee ID does not exist');
    }

    const isThereAStatus = await models.findStatusForAnEmployeeForADate(id, date);

    if (isThereAStatus.length === 0) {
      return res.status(400).send('no status exists for this employee on this date');
    }

    await models.deleteStatusToEmployee(id, date);

    return res.status(200).send('delete is done');
  },

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
      const token = jwt.sign(
        {
          user_id: user.regNumber,
          role: user.role,
        },
        process.env.TOKEN_KEY,

        {
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
    return res.status(400).send('Invalid Credentials');
  },

  async getAllTeamWithMembers(_, res) {
    const teams = await models.getAllTeamWithMembers();

    return res.status(200).json(teams);
  },

  async getPlanning(_, res) {
    const shifts = await getAllShift();
    const affectedStatus = await getAllAffectedStatus();
    // initialize planning array with each date.
    /*
      [
        {
          date: date1,
          teams: []
        },
        {
          date: date2,
          teams: []
        }
      ]
    */
    const planning = [];
    shifts.forEach((shift) => {
      if (!planning.find((date) => date === shift.date)) {
        planning.push({
          date: shift.date,
          teams: [],
        });
      }
    });
    planning.forEach((planningDate) => {
      // assigns teams for each planning date.
      /*
      [
        {
          date: date1,
          teams: [
            {
              "teamId": 1,
              "team": "Equipe A",
              "shift": "",
              "status": []
            },
          ]
        }
      ]
    */
      const filteredShifts = shifts.filter((shift) => planningDate.date === shift.date);
      filteredShifts.forEach((resultElement) => {
        planningDate.teams.push({
          teamId: resultElement.team_id,
          team: resultElement.team_name,
          shift: resultElement.label,
          status: [],
        });
      });
      const filteredStatus = affectedStatus.filter((affStatus) => planningDate.date === affStatus.date);
      filteredStatus.forEach((resultElement) => {
        // assings all status to their team for each date.
        /*
          {
            "teamId": 1,
            "team": "Equipe A",
            "shift": "",
            "status": [
              {
                "statusId": 1,
                "firstName": "Esteban",
                "lastName": "ROBERT",
                "status": "Récup"
              }
            ]
          },
        */
        const team = planningDate.teams.find((planningDateTeam) => planningDateTeam.teamId === resultElement.team_id);
        team.status.push({
          statusId: resultElement.id,
          firstName: resultElement.first_name,
          lastName: resultElement.last_name,
          status: resultElement.status,
          comment: resultElement.commentaire,
        });
      });
      planningDate.teams.forEach((team) => {
        if (team.status.length === 0) {
          delete team.status;
        }
      });
    });
    return res.status(200).json(planning);
  },
};
