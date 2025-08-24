import { useEffect, useState } from "react";
import styles from "./UserProfileStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import porifilImg from "../../assets/profilImg.png";
import * as userService from "../../services/authServices";

export default function UserProfile({ userData, setUserData }) {
  const [imagePreview, setImagePreview] = useState(userData?.avatar);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUserData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  const logout = async () => {
    try {
      await userService.logout();

      setUserData({
        avatar: porifilImg,
        email: null,
        username: null,
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    if (userData) {
      setMovies(userData.movies);
    } else {
      try {
        const localMovies = JSON.parse(localStorage.getItem("movies") || "[]");
        setMovies(localMovies);
      } catch (error) {
        setMovies([]);
        console.error(error);
      }
    }
  }, [userData?.movies]);

  useEffect(() => {
    setImagePreview(userData?.avatar);
  }, [userData?.avatar]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <section className="container">
      <div className={styles.profileContainer}>
        <div className={styles.mediaContainer}>
          <div className={styles.userImg}>
            <img
              src={imagePreview}
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>

          <label className={styles.button}>
            <i className="fa-solid fa-image"></i>
            Change Photo
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className={styles.userInfo}>
          <h1>{userData.email}</h1>
          <h1>{userData.username}</h1>
        </div>

        <div className={styles.infoContainer}>
          <Link to={"/watch-later"} className={styles.infoBox}>
            <p>Watchlater list: {movies.length} movies</p>
          </Link>
        </div>
        <button className={styles.button} onClick={() => logout()}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </section>
  );
}
