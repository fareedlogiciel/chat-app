const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router.post("/new", messageController.new_message);
router.get("/", messageController.get_all_messages);
router.get("/:conversation_id", messageController.get_messages_by_con_id);

module.exports = router;
