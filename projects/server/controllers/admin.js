const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const emailExist = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      if (emailExist.role == "user") throw "User unauthorized";
      if (emailExist === null) throw "Email Not Found";
      const isValid = await bcrypt.compare(password, emailExist.password);
      if (!isValid) throw "Password Incorrect";
      const token = jwt.sign(
        {
          id: emailExist.id,
          email: emailExist.email,
          name: emailExist.name,
        },
        "kompeni-mart"
      );

      res.status(200).send({
        user: {
          id: emailExist.id,
          name: emailExist.name,
          email: emailExist.email,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
