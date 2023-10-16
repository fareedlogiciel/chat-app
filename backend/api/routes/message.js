const express = require("express");
const router = express.Router();

router.get("/messages", (req, res) => {
  const messages = [
    { name: "Tim", message: "yo" },
    { name: "Pam", message: "hi" },
  ];
  res.status(200).send(messages);
});

module.exports = router;
