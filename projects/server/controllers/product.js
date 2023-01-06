const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const cart = db.Cart;
const product = db.Product;

module.exports = {
  getAll: async (req, res) => {
    try {
      const user = await product.findAll({
        attributes: [
          "id",
          "name",
          "category",
          "price",
          "images",
          "statement",
          "size",
        ],
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getById: async (req, res) => {
    try {
      const user = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const { name, category } = req.query;
      const user = await product.findAll({
        where: {
          [Op.or]: {
            name: name ? name : "",
            category: category ? category : "",
          },
        },
        raw: true,
      });
      console.log(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { name, category } = req.query;
      const user = await book.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${name}%`,
            },
            Author: {
              [Op.like]: `%${category}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalBooks: async (req, res) => {
    try {
      const user = await product.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await product.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(req.params.id);
      const user = await product.findAll();
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { name, category, price } = req.body;
      let fileUploaded = req.file;
      await book.update(
        {
          name,
          category,
          price,
        },
        {
          images: fileUploaded.filename,
        },
        {
          where: { id: req.params.id },
        }
      );
      const user = await product.findOne({ where: { id: req.params.id } });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const user = await product.findAll({
        order: [[data, order]],
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  view: async (req, res) => {
    try {
      const { page, limit, search_query, order, order_direction } = req.query;
      const productList_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 6;
      const search = search_query || "";
      const offset = list_limit * productList_page;
      const orderby = order || "name";
      const direction = order_direction || "DESC";
      const totalRows = await product.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              price: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              category: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await product.findAll({
        include: [
          {
            model: cart,
            attributes: ["id", "UserId"],
          },
        ],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              price: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              category: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        include: [
          {
            model: cart,
            attributes: ["id", "UserId"],
          },
        ],
      });
      console.log(result);
      res.status(200).send({
        result: result,
        page: productList_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
