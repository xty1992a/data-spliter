var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");

const upload = multer();

router.post("/upload", upload.any(), function (req, res, next) {
  console.log(req.files[0]);
  res.send({ success: true, message: "upload:success!" });
});

router.post("/preUpload", function (req, res, next) {
  res.send({ success: true, message: "" });
});

router.post("/check", function (req, res) {
  console.log(req.body);
  res.send({ success: true, message: "" });
});

module.exports = router;
