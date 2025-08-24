import { createContext, useEffect, useState } from "react";
import porifilImg from "../assets/profilImg.png";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("avatar");
    return {
      _id: null,
      avatar: saved || porifilImg,
      email: null,
      username: null,
      movies: [],
      sharedPlaylist: [],
      accessToken: null,
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
            _id: null,
            avatar: porifilImg,
            email: null,
            username: null,
            movies: [],
            sharedPlaylist: [],
            accessToken: null,
          });
          localStorage.removeItem("avatar");
          return;
        }

        const { userData: fetchedUser = {} } = await res.json();

        // Save all relevant fields
        setUserData({
          _id: fetchedUser._id || null,
          avatar: fetchedUser.avatar || porifilImg,
          email: fetchedUser.email || null,
          username: fetchedUser.username || null,
          movies: fetchedUser.movies || [],
          sharedPlaylist: fetchedUser.sharedPlaylist || [],
          accessToken: fetchedUser.accessToken || null,
        });

        // Cache avatar in localStorage
        localStorage.setItem("avatar", fetchedUser.avatar || porifilImg);
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
