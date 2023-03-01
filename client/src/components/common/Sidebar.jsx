import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import { Drawer, IconButton, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assests from "../../assets/index";

const Sidebar = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const sidebarWidth = 250;
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
