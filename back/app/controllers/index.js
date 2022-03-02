const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
   * Controller used to show aull the employee data
   * ExpressMiddleware signature :
   * @param {*} req Express request object (not used)
   * @param {*} res Express response object
   * @returns {object} JSON of all the employees
   */
  async getAllEmployee(_, res) {
    const employees = await models.getAllEmployee();
    return res.json(employees);
  },

  async hashAllEmployeePassword(req, res) {
    const employees = await models.getAllEmployee();

    employees.forEach(async (employee) => {
      // console.log('Je suis dans le foreach');
      const encryptedPassword = await bcrypt.hash(employee.password, 10);
      // console.log(encryptedPassword);
      employee.password = encryptedPassword;
      await models.updateEmployee(employee);
    });

    return res.json('done');
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
    res.status(400).send('Invalid Credentials');
  },

};
