const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { uuid } = require('uuidv4');
const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, password, email, phone_number } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const isIdentical = await bcrypt.compare(password, hashPassword);
      console.log(isIdentical);
      const verificationSignature = await uuid();

      const user = await User.build({
        name,
        email,
        password: hashPassword,
        phone_number,
        verification_signature: verificationSignature,
      });
      await user.save();

      var transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'cc2bc063db04e6',
          pass: 'ff74359a65d51c',
        },
      });
      const message = {
        from: 'nakulabaiduri@gmail.com',
        to: 'nakulabaiduri@gmail.com',
        subject: 'Verifikasi Email',
        html: `<a href="http://localhost:2000/users/verification?email=${email}&verification_signature=${verificationSignature}">Klik disini untuk verifikasi</a>`,
      };
      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      const total = await User.count({ where: { email } });
      console.log('total', total);
      res.status(200).send(user.toJSON());
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
