import { Stack } from "@mui/material";
import React from "react";
import Items from "../Shared/Items";
import { motion } from "framer-motion";
const ListChats = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  deletechats,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newmessage = newMessageAlert.find(({ chatId }) => chatId === _id);
        // console.log(onlineUsers);
        // console.log(members);
        // console.log(chatId, _id);

        const isonline = members?.some((member) =>
          onlineUsers.includes(member)
        );
        // console.log(isonline);

        return (
          <Items
            index={index}
            newmessage={newmessage}
            isonline={isonline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            samesender={chatId === _id}
            deletechats={deletechats}
          />
        );
      })}
    </Stack>
  );
};

export default ListChats;
