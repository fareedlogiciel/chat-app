const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const upload = require("../../upload");

router.post(
  "/",
  upload.single("attachment"),
  uploadController.upload_attachment
);

module.exports = router;
