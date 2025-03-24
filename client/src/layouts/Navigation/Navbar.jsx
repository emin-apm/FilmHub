import { useState } from "react";
import styles from "./NavbarStyles.module.css";
import porifilImg from "../../assets/profilImg.png";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className={styles.header}>
      <div
        className={`${styles.menuBtn} ${isActive ? styles.active : ""}`}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.nav} container`}>
        <a href="" className={styles.logo}>
          Film<span>Hub</span>
        </a>
        <div className={styles.searchBox}>
          <input type="search" placeholder="Search movie" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <a href="" className={styles.user}>
          <img src={porifilImg} alt="profilImg" />
        </a>
        <div className={styles.navbar}>
          <a href="" className={styles.navLink}>
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
          </a>
          <a href="" className={styles.navLink}>
            <i class="fa-solid fa-fire"></i>
            <span>Trending</span>
          </a>
          <a href="" className={styles.navLink}>
            <i class="fa-solid fa-compass"></i>
            <span>Explore</span>
          </a>
          <a href="" className={styles.navLink}>
            <i class="fa-solid fa-heart"></i>
            <span>Favorites</span>
          </a>
          <a href="" className={styles.navLink}>
            <i class="fa-solid fa-clapperboard"></i>
            <span>Watch Later</span>
          </a>
        </div>
      </div>
    </header>
  );
}
