import styles from "./HeroStyles.module.css";
import hero from "../../assets/hero2.jpg";

export default function Hero() {
  return (
    <section className={`${styles.hero} container`}>
      <img src={hero} alt="hero img" />
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>
          Film<span>Hub</span>
        </h1>
        <p>
          Everything you're looking for in one place! Discover, stream, and
          enjoy without limits.
        </p>
        <a href="" className={styles.watchButton}>
          <i className="fa-solid fa-circle-play"></i>
          <span>Watch movie</span>
        </a>
      </div>
    </section>
  );
}
