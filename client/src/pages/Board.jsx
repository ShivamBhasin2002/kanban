import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutline";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {} from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import boardApi from "../api/boardApi";
import EmojiPicker from "../components/common/EmojiPicker";
import { setBoards } from "../features/board/boardSlice";

let timer;
const timeout = 500;

const Board = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [section, setSection] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");

  const boards = useSelector((state) => state.board.value);

  const getBoard = async () => {
    try {
      const res = await boardApi.getSingleBoard(boardId);
      setTitle(res?.title);
      setDescription(res?.description);
      setSection(res?.sections);
      setIsFavourite(res?.favourite);
      setIcon(res?.icon);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.find((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await boardApi.updateBoard(boardId, { icon: newIcon });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.find((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };
    dispatch(setBoards(temp));
    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { title: newTitle });
      } catch (err) {
        toast.error(err.message);
      }
    });
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { description: newDescription });
      } catch (err) {
        toast.error(err.message);
      }
    });
  };

  useEffect(() => {
    getBoard();
  }, [boardId]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <IconButton>
          {isFavourite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>

        <IconButton variant="outline" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box sx={{}}>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
        </Box>
        <TextField
          value={description}
          onChange={updateDescription}
          placeholder="Add a description"
          variant="outlined"
          multiline
          fullWidth
          sx={{
            "& .MuiOutlinedInput-input": { padding: 0 },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
            "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
          }}
        />

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button>Add Section</Button>
            <Typography variant="body2" fontWeight="700">
              {section?.length} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin: "10px 0px" }} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
