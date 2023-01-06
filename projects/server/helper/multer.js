const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"), console.log(file);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      "IMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 10000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

exports.multerUpload = multer({
  storage,
  // fileFilter: (req, file, cb) => {
  //   const fileExt = file.mimetype.split("/")[1];
  //   if (
  //     (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg") &&
  //     file.size <= 1000000
  //   ) {
  //     cb(null, true);
  //     return;
  //   }
  //   cb(null, false);
  // },
});
