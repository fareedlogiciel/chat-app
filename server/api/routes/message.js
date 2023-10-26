const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router.post("/new", messageController.new_message);
router.get("/:user_id", messageController.get_messages_by_user_id);

module.exports = router;
