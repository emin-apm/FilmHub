import { useContext, useEffect, useState } from "react";
import styles from "./LoginStyles.module.css";
import UserContext from "../../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import * as userService from "../../services/authServices";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

export default function Login({ onClose }) {
  const { setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const user = await userService.googleSign({
          access_token: response.access_token,
        });
        setUserData(user);
        onClose();
      } catch (err) {
        console.error("Google login failed", err);
      }
    },
    onError: (err) => console.error("Google login error:", err),
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login(formData.email, formData.password);
      setUserData(user);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  // Email/password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const user = await userService.register(
        formData.email,
        formData.password
      );
      setUserData(user);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        <div className={`${styles.formBox} ${styles.login}`}>
          <h2>{isRegistering ? "Register" : "Login"}</h2>

          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Email</label>
            </div>

            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder=" "
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <label>Password</label>
            </div>

            {isRegistering && (
              <div className={styles.inputBox}>
                <span className={styles.icon}>
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder=" "
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <label>Confirm Password</label>
              </div>
            )}

            {!isRegistering && (
              <div className={styles.rememberCheck}>
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  Remember Me
                </label>
                <a href="">Forgot password?</a>
              </div>
            )}

            <button type="submit" className={styles.btn}>
              {isRegistering ? "Register" : "Login"}
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <button
              type="button"
              className={styles.btn}
              onClick={loginWithGoogle}
            >
              <i className="fa-brands fa-google"></i>{" "}
              {isRegistering ? "Register with Google" : "Login with Google"}
            </button>

            <div className={styles.loginRegister}>
              <p>
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsRegistering((prev) => !prev)}
                  className={styles.registerLink}
                >
                  {isRegistering ? "Login" : "Register"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
