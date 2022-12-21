import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: props.fullHeight ? "100vh" : "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
