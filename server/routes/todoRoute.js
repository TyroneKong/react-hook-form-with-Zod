const express = require("express");
const router = express.Router();
const { postTodos } = require("../controllers/todos");

router.post("/", postTodos);

module.exports = router;
