import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Drawer, IconButton, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import boardApi from "../../api/boardApi";
import assests from "../../assets/index";
import { setBoard } from "../../features/board/boardSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarWidth = 250;

  const getAllBoards = async () => {
    try {
      const res = await boardApi.getAllBoards();
      dispatch(setBoard(res));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged Out 👍🏻");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assests.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" fontWeight="700">
              {user?.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" fontWeight="700">
              Favourites
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" fontWeight="700">
              Private
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
