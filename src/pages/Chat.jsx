import {
  AttachFile as AttachFileIccon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Filemenu from "../components/dialogbox/Filemenu";
import Applayout from "../components/layout/Applayout";
import MessageComp from "../components/Shared/MessageComp";
import { Inputbox } from "../components/styles/StyledComponents";
import { sampleMessage } from "../constants/data";
import { getSocket } from "../socket";
import {
  CHAT_ENDED,
  CHAT_STARTED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/miscellaneous";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import TypingLoader from "../components/layout/TypingLoader";
import { useNavigate } from "react-router-dom";
const Chat = ({ chatId, members, user }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const socket = getSocket();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [numMessages, setNumMessages] = useState([]);
  const [page, setPages] = useState(1);
  const [fileAnchor, setFileAnchor] = useState(null);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  // console.log(userTyping);

  const typingTimeout = useRef(null);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunkData = useGetMessagesQuery({ chatId, page });
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    {
      isError: oldMessagesChunkData.isError,
      error: oldMessagesChunkData.error,
    },
  ];

  const member = chatDetails?.data?.chat?.members;
  // console.log(member);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunkData.data?.totalPages,
    page,
    setPages,
    oldMessagesChunkData.data?.messages
  );
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      socket.emit(START_TYPING, { member, chatId });
      // console.log(members);

      setTyping(true);
    }
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      // console.log(members);

      socket.emit(STOP_TYPING, { member, chatId });
      setTyping(false);
    }, 2000);
  };
  const handleFile = (e) => {
    dispatch(setIsFileMenu(true));
    setFileAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    socket.emit(NEW_MESSAGE, { chatId, member, message });
    setMessage("");
  };
  useEffect(() => {
    socket.emit(CHAT_STARTED, { userId: user._id, member });
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessage("");
      setNumMessages([]);
      setOldMessages([]);
      setPages(1);
      socket.emit(CHAT_ENDED, { userId: user._id, member });
    };
  }, [chatId]);
  useEffect(() => {
    if (chatDetails.isError) {
      return navigate("/");
    }
  }, [chatDetails.data]);
  const func = useCallback(
    (data) => {
      if (data.chatId !== chatId) {
        return;
      }
      setNumMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) {
        return;
      }
      // console.log("start-typing");
      // console.log(member);

      setUserTyping(true);
      // console.log("typing", data);
    },
    [chatId]
  );
  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) {
        return;
      }
      // console.log("stop-typing");
      // console.log(member);

      setUserTyping(false);
      // console.log("typing", data);
    },
    [chatId]
  );
  const eventhandlers = {
    [NEW_MESSAGE]: func,
    [START_TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
  };
  useSocketEvents(socket, eventhandlers);
  useErrors(errors);
  const allMessages = [...oldMessages, ...numMessages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#292a2e"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComp message={i} user={user} key={i._id} />
        ))}
        {userTyping && <TypingLoader />}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.2rem",
              rotate: "-30deg",
              color: "white",
              bgcolor: "#1e1f22",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ef4444",
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.8)",
              },
              "&:active": {
                boxShadow: "0 0 25px rgba(239, 68, 68, 1)",
              },
            }}
            onClick={handleFile}
          >
            <AttachFileIccon />
          </IconButton>
          <Inputbox
            placeholder="Type Message here..."
            value={message}
            onChange={messageChangeHandler}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "#1e1f22",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              transition: "all 0.3s ease",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "#4ade80",
                color: "black",
                boxShadow: "0 0 15px rgba(74, 222, 128, 0.8)",
              },
              "&:active": {
                boxShadow: "0 0 25px rgba(74, 222, 128, 1)",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <Filemenu anchorE1={fileAnchor} chatId={chatId} />
    </>
  );
};

export default Applayout()(Chat);
