import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";
const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const socketContext = createContext();
const getSocket = () => useContext(socketContext);
const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export { SocketProvider, getSocket };
