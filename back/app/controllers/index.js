const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  getAllShift,
  getAllAffectedStatus,
} = require('../models');
const employeeController = require('./employee');
const statusController = require('./status');
const affectedStatusController = require('./affectedStatus');
const teamController = require('./team');
const models = require('../models');

const mainController = {
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
 * Creation of the JSON web Token, the sign include the employee role.
 * ExpressMiddleware signature :
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns {object} JSON of logged in employee including token
 */
  async login(req, res) {
    const {
      regNumber,
      password,
    } = req.body;

    // Validate employee input
    if (!(regNumber && password)) {
      res.status(400).send('All input are required');
    }
    // Validate if employee exist in our database
    const employee = await models.getOneEmployeeByReg_number(regNumber);

    if (employee && (await bcrypt.compare(password, employee.password))) {
      // Create token
      const token = jwt.sign(
        {
          employee_id: employee.regNumber,
          role: employee.role,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_VALIDITY,
        },
      );

      // save employee token
      employee.token = token;

      // employee
      delete employee.password;
      delete employee.created_at;
      delete employee.updated_at;
      return res.status(200).json(employee);
    }
    return res.status(400).send('Invalid Credentials');
  },

  /**
   * Method used to return all faction/affected status for each day
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all days including faction and affected status
   */
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
      if (!planning.find((date) => date.date === shift.date)) {
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

module.exports = {
  mainController,
  employeeController,
  statusController,
  affectedStatusController,
  teamController,
};
