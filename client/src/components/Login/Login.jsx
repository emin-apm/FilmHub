import { useEffect } from "react";
import styles from "./LoginStyles.module.css";

export default function Login({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    // Block background scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when modal unmounts
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <div className={`${styles.formBox} ${styles.login}`}>
          <h2>Login</h2>
          <form action="">
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" placeholder=" " required />
              <label htmlFor="">Email</label>
            </div>
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" placeholder=" " required />
              <label htmlFor="">Password</label>
            </div>
            <div className={styles.rememberCheck}>
              <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                Remember Me
              </label>
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <button type="submit" className={styles.btn}>
              <i className="fa-brands fa-google"></i> Sign in with Google
            </button>
            <div className={styles.loginRegister}>
              <p>
                Don't have accaount?
                <a href="" className={styles.registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
