import { useEffect, useState } from "react";
import styles from "./UserProfileStyles.module.css";

export default function UserProfile({ userData, setUserData }) {
  const [imagePreview, setImagePreview] = useState(userData?.picture);

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
          <h1>eminapturaim@gmail.com</h1>
          <h1>Eminkataa</h1>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <p>Watchlater list: 3 movies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
