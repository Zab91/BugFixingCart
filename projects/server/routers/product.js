const router = require("express").Router();
const { productController } = require("../controllers");

router.get("/list", productController.getAll);
router.get("/list/filter", productController.getBy);
router.get("/search", productController.searchBy);
router.get("/view", productController.view);
router.get("/sort", productController.sortBy);
router.get("/list/:id", productController.getById);
router.get("/list/total", productController.totalBooks);

module.exports = router;
