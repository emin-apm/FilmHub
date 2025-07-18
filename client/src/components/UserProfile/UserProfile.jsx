import { useEffect, useState } from "react";
import styles from "./UserProfileStyles.module.css";
import { Link } from "react-router-dom";

export default function UserProfile({ userData, setUserData }) {
  const [imagePreview, setImagePreview] = useState(userData?.picture);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setImagePreview(userData?.picture);
  }, [userData?.picture]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUserData((prev) => ({
        ...prev,
        picture: imageUrl,
      }));
    }
  };

  useEffect(() => {
    try {
      let localMovies = JSON.parse(localStorage.getItem("movies") || []);
      setMovies(localMovies);
    } catch (error) {
      setMovies([]);
      console.log(error);
    }
  }, []);

  return (
    <section className="container">
      <div className={styles.profileContainer}>
        <div className={styles.mediaContainer}>
          <div className={styles.userImg}>
            <img src={imagePreview} alt="Profile" />
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
      </div>
    </section>
  );
}
