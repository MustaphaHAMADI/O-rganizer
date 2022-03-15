const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = {

  /**
   * Controller used to hash all the passords on the employee table
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {string} Positive response of the hash
   */
  async hashAllEmployeePassword(req, res) {
    const employees = await models.getAllEmployeeToBeHashed();

    employees.forEach(async (employee) => {
      const encryptedPassword = await bcrypt.hash(employee.password, 10);
      employee.password = encryptedPassword;
      await models.updateEmployee(employee);
    });

    return res.json('done');
  },

  /**
   * Controller used to add an employee in the database
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {object} Employee recently aded
   */
  async addEmployee(req, res) {
    let employee = {
      regNumber: '',
      role: '',
      password: '',
      name: '',
      lastname: '',
      function: '',
      profilePicture: '',
      teamId: null,
    };

    const verifiedEmployee = await models.getOneEmployeeByReg_number(req.body.regNumber);
    if (verifiedEmployee) {
      return res.status(400).send('This employee already exist in the database');
    }

    if (!req.body.regNumber || !req.body.role || !req.body.password) {
      return res.status(400).send('The mandatory informations are missing : REG NUMBER, PASSWORD and/or ROLE');
    }
    if (req.body.password.length < 5) {
      return res.status(400).send('password must be 5 character minimum');
    }

    if (req.body.role !== 'user' && req.body.role !== 'admin') {
      return res.status(400).send('The role must be "user" or "admin"');
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;

    employee = { ...employee, ...req.body };

    const answer = await models.addEmployee(employee);
    delete answer.password;
    delete answer.created_at;
    delete answer.updated_at;
    return res.json(answer);
  },

  /**
   * Controller used to delete an employee in the database
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {object} Employee recently aded
   */
  async deleteEmployee(req, res) {
    const { id } = req.params;

    const employee = await models.getOneEmployeeById(id);

    if (!employee) {
      return res.status(400).send('This employee does not exist in the database');
    }
    await models.deleteEmployee(id);

    return res.status(200).send('delete is done');
  },

  /**
 * Controller used to update an employee in the database
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @returns {object} Employee recently aded
   */
  async updateEmployee(req, res) {
    const { id } = req.params;

    let employee = await models.getOneEmployeeById(id);

    const existingEmployee = await models.getOneEmployeeByReg_number(req.params.reg_number);

    if (existingEmployee) {
      return res.status(400).send('there is already an employee with this regNumber');
    }

    if (!employee) {
      return res.status(400).send('This employee does not exist in the database');
    }

    if (req.body.password || req.body.password === '') {
      if (req.body.password.length < 5) {
        return res.status(400).send('The password must be at least 5 caracter');
      }
    }

    const hash = employee.password;

    employee = { ...employee, ...req.body };

    if (hash === employee.password) {
      await models.updateEmployee(employee);
      return res.status(200).send('update is done');
    }

    const encryptedPassword = await bcrypt.hash(employee.password, 10);
    employee.password = encryptedPassword;
    await models.updateEmployee(employee);
    return res.status(200).send('update is done');
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
   * Controller used to send back an enployee based on his ID
    @param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of the employee found
   */
  async getOneEmployeeById(req, res) {
    const id = Number(req.params.id);
    const employee = await models.getOneEmployeeById(id);
    if (!employee) {
      return res.status(400).send('This employee ID does not exist');
    }
    delete employee.password;
    return res.status(200).json(employee);
  },

};
