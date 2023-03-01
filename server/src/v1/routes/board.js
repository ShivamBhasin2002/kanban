const router = require("express").Router();
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandle");
const boardController = require("../controllers/board");

router.post("/", tokenHandler.verifyToken, boardController.createBoard);
router.get("/", tokenHandler.verifyToken, boardController.getAllBoards);

module.exports = router;
