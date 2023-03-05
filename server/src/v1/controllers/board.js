const Board = require("../models/board");
const Task = require("../models/task");
const Section = require("../models/section");
const board = require("../models/board");

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

exports.getSingleBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId });
    if (!board) return res.status(400).json("No Board found with this ID!");

    const sections = await Section.find({ board: boardId });
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate("section")
        .sort("-position");
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;

  try {
    if (title === "") req.body.title = "Untitled";
    if (description === "") req.body.description = "Add description here";

    const currentBoard = await Board.findById(boardId);
    if (!currentBoard)
      return res.status(404).json("No Board found with this Id!");

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      });

      if (favourites) {
        req.body.favouritePosition =
          favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          const element = favourites[key];

          await Board.findByIdAndUpdate(element?.id, {
            $set: { favouritePosition: key },
          });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, { $set: req.body });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
