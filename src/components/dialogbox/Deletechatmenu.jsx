import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/miscellaneous";
import { Delete, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatGroupMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const Deletechatmenu = ({ dispatch, deleteAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );
  const [deleteTheChat, _, deleteTheChatData] = useAsyncMutation(
    useDeleteChatGroupMutation
  );
  const [leaveGroupChat, __, leaveGroupChatData] = useAsyncMutation(
    useLeaveGroupMutation
  );
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteAnchor.current = null;
  };
  const isGroup = selectedDeleteChat.groupChat;
  const leaveGroup = () => {
    closeHandler();
    leaveGroupChat("Leaving Group...", selectedDeleteChat.chatId);
  };
  const deleteChat = () => {
    closeHandler();
    deleteTheChat("Deleting Chat...", selectedDeleteChat.chatId);
  };
  useEffect(() => {
    if (deleteTheChatData || leaveGroupChatData) {
      navigate("/");
    }
  }, [deleteTheChatData, leaveGroupChatData]);
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        textAlign={"center"}
        alignItems={"center"}
        spacing={"1rem"}
        onClick={isGroup ? leaveGroup : deleteChat}
      >
        {isGroup ? (
          <>
            <ExitToApp /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <Delete />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default Deletechatmenu;
