import {
  Close,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "../styles/StyledComponents";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/createThunks/createThunk";
const AdminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];
const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  // console.log(isAdmin);

  const [isMobile, setIsMobile] = useState(false);
  const handlemobile = () => {
    setIsMobile(!isMobile);
  };
  const handelClose = () => {
    setIsMobile(false);
  };
  if (!isAdmin) {
    return <Navigate to={"/admin"} />;
  }
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handlemobile}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          bgcolor: "#36393f",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} bgcolor={"#1e1f22"}>
        {children}
      </Grid>
      <Drawer
        open={isMobile}
        onClose={handelClose}
        PaperProps={{
          sx: { bgcolor: "#36393f", color: "white" },
        }}
      >
        <Sidebar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};
const Sidebar = ({ w = "100%" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    // console.log("logout");
    dispatch(adminLogout());
  };
  return (
    <Stack
      width={w}
      direction={"column"}
      padding={"2rem"}
      spacing={"3rem"}
      // bgcolor={"#36393f"}
      border={"orange"}
    >
      <Typography
        variant="h5"
        textTransform={"uppercase"}
        textAlign={"center "}
        color={"white"}
      >
        Gossipo
      </Typography>
      <Stack spacing={"1.5rem"}>
        {AdminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black",
                color: "white",
                borderRadius: "5rem",
                "&:hover": {
                  bgcolor: "gray",
                  color: "white",
                },
              }
            }
          >
            <Stack
              direction={"row"}
              spacing={"1rem"}
              alignItems={"center"}
              color={"white"}
            >
              {tab.icon}
              <Typography color={"white"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={handleLogout}>
          <Stack
            direction={"row"}
            spacing={"1rem"}
            alignItems={"center"}
            color={"white"}
          >
            <ExitToApp />
            <Typography color={"white"}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
export default AdminLayout;
