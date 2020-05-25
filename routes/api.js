var express = require("express");
var router = express.Router();
const multer = require("multer");
const file = require("./file");

const upload = multer();

router.post("/check", async function (req, res) {
  res.send(await file.getChildren(req.body.md5));
});

router.post("/uploadChunk", upload.single("file"), async function (req, res) {
  res.send(await file.saveChunk(req.file.buffer, req.body));
});

router.post("/complete", async function (req, res) {
  res.send(await file.complete(req.body));
});

module.exports = router;
