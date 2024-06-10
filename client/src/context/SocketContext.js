import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

export const SocketContext = createContext(); // Create a context object

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("User Socket:", user);
  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      //  socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  const [socket, setSocket] = useState(null); // State to store the socket object
  const [onlineUsers, setOnlineUsers] = useState([]); // State to store online users
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
