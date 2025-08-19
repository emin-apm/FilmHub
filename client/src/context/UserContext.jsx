import { createContext, useEffect, useState } from "react";
import porifilImg from "../assets/profilImg.png";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("avatar");
    return {
      avatar: saved || porifilImg,
      email: null,
      username: null,
    };
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("No valid refresh token or user not logged");
          setUserData({
            avatar: porifilImg,
            email: null,
            username: null,
          });
          localStorage.removeItem("avatar");
          return;
        }

        const { userData: fetchedUser = {} } = await res.json();
        const avatarUrl = fetchedUser.avatar || porifilImg;

        // Save to state
        setUserData({
          avatar: avatarUrl,
          email: fetchedUser.email || null,
          username: fetchedUser.username || null,
        });

        // Cache avatar in localStorage
        localStorage.setItem("avatar", avatarUrl);
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
