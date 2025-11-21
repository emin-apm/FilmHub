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
          <i className="fa-brands fa-facebook"></i>
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
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter profile"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
      </div>
      <div className={styles.copyRigts}>
        <p>&copy; 2025 Filmhub-dev All Rights Reserved.</p>
        <p>
          Note: Filmhub-dev does not host any files itself but fetches the data
          from the TMDB and only displays content from 3rd party providers.
          Legal issues should be taken up with them.
        </p>
      </div>
    </footer>
  );
}
