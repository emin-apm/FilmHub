import { createContext, useEffect, useState } from "react";
import porifilImg from "../assets/profilImg.png";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    avatar: porifilImg,
    email: null,
    username: null,
  });
  //Fetch logic for fetching user data...

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("No valid refresh token or user not loged");
          setUserData({
            avatar: porifilImg,
            email: null,
            username: null,
          });
          return;
        }

        const { userData = {} } = await res.json();

        setUserData({
          avatar: userData.avatar || porifilImg,
          email: userData.email || null,
          username: userData.username || null,
        });
      } catch (err) {
        console.error("Error checking auth:", err);
      }
    };
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
