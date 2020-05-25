var express = require("express");
var router = express.Router();
const multer = require("multer");
const file = require("./file");

const upload = multer();

router.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file, req.body);
  res.send({ success: true, message: "upload:success!" });
});

router.post("/uploadChunk", upload.single("file"), async function (
  req,
  res,
  next
) {
  // res.send({ success: true, message: "success" });
  res.send(await file.saveChunk(req.file.buffer, req.body));
});

router.post("/check", async function (req, res) {
  const result = await file.getChildren(req.body.md5);
  res.send(result);
});

router.post("/complete", async function (req, res) {
  res.send(await file.complete(req.body));
});

module.exports = router;
