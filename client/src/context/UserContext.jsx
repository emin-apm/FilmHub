import { createContext, useEffect, useState } from "react";
import profilImg from "../assets/profilImg.png";
import { getBiggerGoogleProfilePic } from "../utils/getBiggerGooglePic";

const backendUrl = import.meta.env.VITE_API_BASE_BACKEND_URL;

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("avatar");
    return {
      _id: null,
      avatar: saved || profilImg,
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
        const res = await fetch(`${backendUrl}/user/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("No valid refresh token or user not logged");
          setUserData({
            _id: null,
            avatar: profilImg, // ✅ no fetchedUser here
            email: null,
            username: null,
            movies: [],
            sharedPlaylist: [],
            accessToken: null,
          });
          localStorage.removeItem("avatar");
          return;
        }

        const data = await res.json();
        const fetchedUser = data.userData || {};

        // Save all relevant fields
        setUserData({
          _id: fetchedUser._id || null,
          avatar: fetchedUser.avatar
            ? getBiggerGoogleProfilePic(fetchedUser.avatar, 450)
            : profilImg,
          email: fetchedUser.email || null,
          username: fetchedUser.username || null,
          movies: fetchedUser.movies || [],
          sharedPlaylist: fetchedUser.sharedPlaylist || [],
          accessToken: fetchedUser.accessToken || null,
        });

        // Cache avatar in localStorage
        localStorage.setItem(
          "avatar",
          fetchedUser.avatar
            ? getBiggerGoogleProfilePic(fetchedUser.avatar, 450)
            : profilImg
        );
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
