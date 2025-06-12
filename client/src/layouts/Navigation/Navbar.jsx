import { useRef, useState } from "react";
import styles from "./NavbarStyles.module.css";
import porifilImg from "../../assets/profilImg.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery) {
      searchInputRef.current?.blur();
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
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
        <Link to={"/"} className={styles.logo}>
          Film<span>Hub</span>
        </Link>

        <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search movie"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* User profile icon */}
        <a href="" className={styles.user}>
          <img src={porifilImg} alt="Profile Img" />
        </a>

        {/* Navbar Links */}
        {/* TO DO: create ROUTES and map them  */}

        <div className={styles.navbar}>
          <Link
            to={"/"}
            className={styles.navLink}
            onClick={() => setSearchQuery("")}
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <Link
            to={"/trending"}
            className={styles.navLink}
            onClick={() => setSearchQuery("")}
          >
            <i className="fa-solid fa-fire"></i>
            <span>Trending</span>
          </Link>
          <Link
            to={"/explore"}
            className={styles.navLink}
            onClick={() => setSearchQuery("")}
          >
            <i className="fa-solid fa-compass"></i>
            <span>Explore</span>
          </Link>
          <Link
            to={"/tvshows"}
            className={styles.navLink}
            onClick={() => setSearchQuery("")}
          >
            <i className="fa-solid fa-film"></i>
            <span>TV Shows</span>
          </Link>
          <Link
            to={"/watch-later"}
            className={styles.navLink}
            onClick={() => setSearchQuery("")}
          >
            <i className="fa-solid fa-clapperboard"></i>
            <span>Watch Later</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
