import styles from "./FooterStyles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialsContainer}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
        >
          <i className="fa-brands fa-square-facebook"></i>
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Instagram profile"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>

        <a
          href="https://discord.gg/scUY5E89tT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join our Discord server"
        >
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>
      <div className={styles.copyRigts}>
        <p>&copy; 2025 Filmhub-dev All Rights Reserved.</p>
        <p>
          Note: Filmhub-dev doesn’t store or host any content. It only shows
          information from TMDB and streams provided by third parties. For legal
          matters, please contact the external providers.
        </p>
      </div>
    </footer>
  );
}
