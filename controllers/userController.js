const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

exports.register = (req, res) => {
  const { username, password , name , phonenumber} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO Users (username, password, name, phonenumber) VALUES (?,?,?,?)';
  db.query(query, [username, hashedPassword,name,phonenumber], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('User registered.');
    }
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(401).send('Invalid username or password.');
    } else {
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        res.status(401).send('Invalid username or password.');
      } else {
        const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ auth: true, token: token });
      }
    }
  });
};
