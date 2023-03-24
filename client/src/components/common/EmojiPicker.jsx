import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useDispatch } from "react-redux";
import { setIcon } from "../../features/board/boardSlice";

const EmojiPicker = (props) => {
  const dispatch = useDispatch();
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  const selectEmoji = (e) => {
    const sym = e?.unified?.split("-");
    const codesArray = [];
    sym?.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    dispatch(setIcon({ oldIcon: selectedEmoji, newIcon: emoji }));
    setSelectedEmoji(emoji);
  };

  useEffect(() => {
    if (props.icon) setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "999",
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
