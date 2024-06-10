import { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Home");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedUser,
        setSelectedUser,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
