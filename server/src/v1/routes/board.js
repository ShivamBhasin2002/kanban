const router = require("express").Router();
const { param } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandle");
const boardController = require("../controllers/board");

router.post("/", tokenHandler.verifyToken, boardController.createBoard);
router.get("/", tokenHandler.verifyToken, boardController.getAllBoards);
router.put("/", tokenHandler.verifyToken, boardController.updateBoardPosition);
router.get(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.getSingleBoard
);

router.get(
  "/favouriteBoards",
  tokenHandler.verifyToken,
  boardController.getFavouriteBoards
);

router.put(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.updateBoard
);

module.exports = router;
