const router = require("express").Router();

const { multerUpload } = require("../helper/multer");
const { userControllerLogin } = require("../controllers");

router.post("/login", userControllerLogin.login);
// router.post("/loginAdmin", userControllerLogin.loginAdmin);
router.get("/keepLogin", userControllerLogin.keepLogin);
router.patch("/editProfile/:id", userControllerLogin.editProfile);
router.get("/getUserId/:id", userControllerLogin.getProfileId);
router.post(
  "/uploadFile/:id",
  multerUpload.single("file"),
  userControllerLogin.uploadFile
);

module.exports = router;
