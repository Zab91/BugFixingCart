const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { uuid } = require("uuidv4");
const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      console.log(req.body);
      const { password, email } = req.body;
      const isEmailExist = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      console.log(isEmailExist);

      if (!isEmailExist) throw "User Not Found";

      const isPasswordValid = await bcrypt.compare(
        password,
        isEmailExist.password
      );
      if (!isPasswordValid) throw "Wrong Password";

      const token = jwt.sign(
        {
          email: isEmailExist.email,
          name: isEmailExist.name,
          is_verified: isEmailExist.is_verified,
          id: isEmailExist.id,
        },
        "kompeni-mart"
      );

      res.status(200).send({
        msg: "Login Sukses",
        user: {
          name: isEmailExist.name,
          id: isEmailExist.id,
          email: isEmailExist.email,
          phone_number: isEmailExist.phone_number,
          // RoleId: isEmailExist.RoleId,
          profile_picture_url: isEmailExist.profile_picture_url,
          gender: isEmailExist.gender,
          birthdate: isEmailExist.birthdate,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "kompeni-mart");
      console.log(verify);
      const result = await User.findAll({
        where: {
          id: verify.id,
        },
      });

      res.status(200).send({
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  editProfile: async (req, res) => {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Update Profile Complete");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getProfileId: async (req, res) => {
    try {
      const profileId = await User.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(profileId[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  uploadFile: async (req, res) => {
    try {
      let fileUploadReq = req.file;
      console.log("controller", fileUploadReq);
      await User.update(
        {
          profile_picture_url: fileUploadReq.filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getUser = await User.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getUser.id,
        name: getUser.name,
        profile_picture_url: getUser.profile_picture_url,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  // loginAdmin: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     console.log(req.body);
  //     const emailExist = await User.findOne({
  //       where: {
  //         email,
  //       },
  //       raw: true,
  //     });

  //     // if (emailExist.role == "user") throw "User unauthorized";
  //     if (emailExist === null) throw "Email Not Found";
  //     const isValid = await bcrypt.compare(password, emailExist.password);
  //     if (!isValid) throw "Password Incorrect";
  //     const token = jwt.sign(
  //       {
  //         id: emailExist.id,
  //         email: emailExist.email,
  //         name: emailExist.name,
  //       },
  //       "kompeni-mart"
  //     );

  //     res.status(200).send({
  //       user: {
  //         id: emailExist.id,
  //         name: emailExist.name,
  //         email: emailExist.email,
  //       },
  //       token,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
};
