import {
  Add,
  Group,
  Logout,
  Menu,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobileMenuFriend,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/miscellaneous";
import { resetNotification } from "../../redux/reducers/chat";
const Searchdialog = lazy(() => import("../other/Search"));
const Notify = lazy(() => import("../other/Notification"));
const Newgroup = lazy(() => import("../other/Newgroup"));
const Header = ({ rightComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationsCount } = useSelector((state) => state.chat);
  // const [isNewGroup, setisnewgroup] = useState(false);
  // console.log(notificationsCount);

  // const [isnotification, setnotification] = useState(false);
  const mobile = () => {
    dispatch(setIsMobileMenuFriend(true));
  };
  const searchDialog = () => {
    dispatch(setIsSearch(true));
  };
  const newGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const groupnavigate = () => {
    navigate("/groups");
  };
  const logout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const notification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotification());
  };
  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        height={"4rem"}
        Backdrop={"blur(10px)"}
        boxShadow={" 0 1px 10px rgba(0, 0, 0, 0.2)"}
        position={"sticky"}
        zIndex={"8"}
      >
        {/* <AppBar position="static" sx={{ bgcolor: "	#ff4b5c" }}> */}
        <AppBar position="static" sx={{ bgcolor: "#1e1f22" }}>
          <Toolbar
            disableGutters
            sx={{
              px: 1, // less horizontal padding
              minHeight: "3.5rem", // smaller height
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "'Urbanist',sans-serif",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Gossipo
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={mobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {rightComponent && (
              <Box sx={{ display: { xs: "block", md: "none" }, mr: 1 }}>
                {rightComponent}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                overflowX: { xs: "auto", sm: "visible" }, // scroll on small screens
                whiteSpace: "nowrap",
                ml: 1,
              }}
            >
              <Iconbutton
                title={"Search"}
                icon={<Search />}
                onclick={searchDialog}
              />

              <Iconbutton
                title={"AddNewGroup"}
                icon={<Add />}
                onclick={newGroup}
              />

              <Iconbutton
                title={"ManageGroup"}
                icon={<Group />}
                onclick={groupnavigate}
              />
              <Iconbutton title={"Logout"} icon={<Logout />} onclick={logout} />
              <Iconbutton
                title={"Notification"}
                icon={<Notifications />}
                onclick={notification}
                value={notificationsCount}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Searchdialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notify />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <Newgroup />
        </Suspense>
      )}
    </>
  );
};
const Iconbutton = ({ title, icon, onclick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        size="large"
        onClick={onclick}
        sx={{
          mx: 0.5,
          transition: "all 0.2s ease-in-out",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            transform: "scale(1.15)",
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {value ? (
          <Badge
            badgeContent={value}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                minWidth: "18px",
                height: "18px",
                fontSize: "0.75rem",
                padding: "0 6px",
              },
            }}
          >
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
