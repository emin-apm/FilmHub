import styles from "./FooterStyles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialsContainer}>
        <a href="www.facebook.com" target="_blank">
          <i class="fa-brands fa-square-facebook"></i>
        </a>
        <a href="" target="_blank">
          <i class="fa-brands fa-square-instagram"></i>
        </a>
        <a href="" target="_blank">
          <i class="fa-brands fa-square-twitter"></i>
        </a>
      </div>
      <span className={styles.copyRight}>
        All rights reserved &copy; 2025 - Emin Apturaim
      </span>
    </footer>
  );
}
