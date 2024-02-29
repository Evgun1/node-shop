const db = require('../db');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async register(request, response) {
    const { email, password, role } = request.body;
    if (!email || !password) {
      response.status(400);
      response.statusMessage = 'Incorrect email or password';
      response.send();
      return;
    }

    const condidate = await db.query(
      `SELECT * FROM users WHERE user_email='${email}'`
    );
    if (condidate.rows && condidate.rows.length > 0) {
      response.status(400);
      response.send('This email already exists');
      return;
    }
    console.log('new user');

    let user;
    const hashPassword = await bcrypt.hash(password, 10);
    if (role) {
      user = await db.query(
        `
                INSERT INTO users (user_email, user_password, user_role)
                VALUES('${email}', '${hashPassword}', '${role}')
                response.end()ING user_id, user_email, user_password, user_role
                `
      );
    } else {
      user = await db.query(
        `
                INSERT INTO users (user_email, user_password)
                VALUES('${email}', '${hashPassword}')
                RETURNING user_id, user_email, user_password, user_role
                `
      );
    }

    const token = generateJwt(
      user.rows[0].user_id,
      user.rows[0].user_email,
      user.rows[0].user_role
    );
    response.json(token);
  }

  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async login(request, response) {
    const { email, password } = request.body;

    const condidate = await db.query(
      `SELECT * FROM users WHERE user_email ='${email}'
            `
    );
    if (condidate.rows.length <= 0) {
      response.status = 400;
      response.send('User is not found');
      return;
    }
    const user = condidate.rows[0];
    let comparePasswoerd = bcrypt.compareSync(password, user.user_password);
    if (!comparePasswoerd) {
      response.status = 400;
      response.send('Incorrect password');
      return;
    }
    const token = generateJwt(user.user_id, user.user_email, user.user_role);
    response.json(token);
  }

  async check(request, response, next) {
    if (request.method === 'OPTIONS') {
      next();
    }
    try {
      const token = request.headers.authorization.split(' ')[1];
      if (!token) {
        return response.status(401).json({ message: 'Not authorized' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      request.user = decoded;
      next();
    } catch (error) {
      response.status(401).json({ message: 'Not authorized' });
    }
    const token = generateJwt(
      request.user.id,
      request.user.email,
      request.user.role
    );
    response.json(token);
  }
}

module.exports = new UserController();
