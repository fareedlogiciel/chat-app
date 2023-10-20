const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversation");

router.post("/new", conversationController.new_conversation);
router.get("/", conversationController.get_all_conversations);
router.get("/:user_id", conversationController.get_conversations_by_user_id);

module.exports = router;
