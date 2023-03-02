const Board = require("../models/board");
const Task = require("../models/task");
const Section = require("../models/section");

exports.createBoard = async (req, res) => {
  try {
    const boardsCount = await Board.find().count();
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort("-position");
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateBoardPosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board?.id, { $set: { position: key } });
    }
    res.status(200).json("Board Position Updated!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
