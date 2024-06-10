import { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Home");
  const [selectedMsg, setSelectedMsg] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedUser,
        setSelectedUser,
        selectedOption,
        setSelectedOption,
        selectedMsg,
        setSelectedMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
