const db = require("../models");
const user = db.User;
const cart = db.Cart;
const product = db.Product;

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      console.log(req.body);
      if (!UserId) throw "Please Login First";

      const data = await cart.create({
        ProductId,
        UserId,
      });
      res.status(200).send({
        massage: "Add To Cart Success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await cart.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        msg: "Cart Deleted!",
        result,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getCart: async (req, res) => {
    try {
      const { id } = req.params;
      const getcart = await cart.findAll({
        attributes: ["id"],
        where: {
          UserId: id,
        },
        include: [{ model: user, attributes: ["name"] }, { model: product }],
      });
      res.status(200).send(getcart);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
