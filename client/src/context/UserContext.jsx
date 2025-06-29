import { createContext, useState } from "react";
import porifilImg from "../assets/profilImg.png";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    picture: porifilImg,
    email: null,
    username: null,
  });
  //Fetch logic for fetching user data...

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
