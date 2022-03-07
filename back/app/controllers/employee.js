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
    const {
      regNumber,
      role,
      name,
      lastname,
      funct,
      profilePicture,
      teamId,
    } = req.body;

    let {
      password,
    } = req.body;

    const verifiedEmployee = await models.getOneEmployeeByReg_number(regNumber);
    if (verifiedEmployee) {
      return res.status(400).send('This employee already exist in the database');
    }

    if (!regNumber || !role || !password) {
      return res.status(400).send('The mandatory informations are missing : REG NUMBER, PASSWORD and/or ROLE');
    }

    if (role !== 'user' && funct !== 'admin') {
      return res.status(400).send('The role must be "user" or "admin"');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    password = encryptedPassword;

    const answer = await models.addEmployee(regNumber, password, role, name, lastname, funct, profilePicture, teamId);
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

    if (!employee) {
      return res.status(400).send('This employee does not exist in the database');
    }

    if (req.body.password || req.body.password === '') {
      if (req.body.password.length === 0) {
        return res.status(400).send('The password must be at least 1 caracter');
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
