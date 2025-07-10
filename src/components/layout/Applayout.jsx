import React, { use, useCallback, useRef } from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import ListChats from "../other/ListChats";
import { chatItems } from "../../constants/data";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../other/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobileMenuFriend,
  setSelectedDeleteChat,
} from "../../redux/reducers/miscellaneous";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE,
  REFETCH_CHATS,
} from "../../constants/event";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { useEffect } from "react";
import { saveToLocalStorage } from "../../lib/feature";
import Deletechatmenu from "../dialogbox/Deletechatmenu";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

const Applayout = () => (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const chatId = params.id;
    const dispatch = useDispatch();
    const socket = getSocket();
    // console.log(socket.id);
    const deleteAnchor = useRef(null);
    const { isMobileMenuFriend } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    // console.log(isMobileMenuFriend);
    const [isOnlineUsers, setIsOnlineUsers] = useState([]);
    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    // console.log(data);
    const isMobile = useMediaQuery("(max-width:900px)");
    const [showProfile, setShowProfile] = useState(false);
    useEffect(() => {
      saveToLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);
    const deletechats = (e, _id, groupChat) => {
      // e.preventDefault();
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
      deleteAnchor.current = e.currentTarget;
      // console.log("Chat deleted", _id, groupchat);
    };
    const handleMobileClose = () => {
      dispatch(setIsMobileMenuFriend(false));
    };
    const newMessageAlert = useCallback(
      (data) => {
        if (data.chatId === chatId) {
          return;
        }
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );
    // console.log("Hii");

    const newRequest = useCallback(() => {
      // console.log("yeah");

      dispatch(incrementNotification());
    }, [dispatch]);
    // console.log("bye");
    const refetchHandler = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onLine = useCallback((data) => {
      // console.log(data);
      setIsOnlineUsers(data);
    }, []);

    const eventhandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlert,
      [NEW_REQUEST]: newRequest,
      [REFETCH_CHATS]: refetchHandler,
      [ONLINE]: onLine,
    };
    // console.log(eventhandlers);
    // console.log(isOnlineUsers);

    useSocketEvents(socket, eventhandlers);
    return (
      <>
        <Title title={"Gossipo"} />
        <Header
          rightComponent={
            isMobile && (
              <Tooltip title="Profile">
                <IconButton
                  color="inherit"
                  onClick={() => setShowProfile(true)}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )
          }
        />

        <Deletechatmenu dispatch={dispatch} deleteAnchor={deleteAnchor} />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobileMenuFriend}
            onClose={handleMobileClose}
            // bgcolor={"black"}
          >
            <Box
              sx={{
                width: "70vw",
                height: "100%",
                bgcolor: "#2f3136", // ✅ match fullscreen background
                boxShadow: "inset 1px 0 0 #202225",
              }}
            >
              <ListChats
                chats={data?.chats}
                chatId={chatId}
                deletechats={deletechats}
                newMessageAlert={newMessagesAlert}
                // onlineUsers={isOnlineUsers}
              />
            </Box>
          </Drawer>
        )}
        <Drawer
          anchor="right"
          open={showProfile}
          onClose={() => setShowProfile(false)}
        >
          <Box
            sx={{
              width: "80vw",
              height: "100vh",
              bgcolor: "#1e1e1e",
              p: 2,
            }}
          >
            <Profile user={user} />
          </Box>
        </Drawer>
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            bgcolor={"#2f3136"}
            boxShadow={"inset 1px 0 0 #202225"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ListChats
                chats={data?.chats}
                chatId={chatId}
                deletechats={deletechats}
                newMessageAlert={newMessagesAlert}
                // onlineUsers={isOnlineUsers}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            // color={"#313338"}
            bgcolor={"#36393f"}
            borderRight={"1px solid #202225"}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "#1e1e1e",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default Applayout;
