import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/event";
const initialState = {
  notificationsCount: 0,
  newMessagesAlert: saveToLocalStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationsCount += 1;
    },
    resetNotification: (state) => {
      state.notificationsCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    removeNewMessageAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotification,
  resetNotification,
  setNewMessagesAlert,
  removeNewMessageAlert,
} = chatSlice.actions;
