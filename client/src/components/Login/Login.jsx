import { useContext, useEffect, useState } from "react";
import styles from "./LoginStyles.module.css";
import UserContext from "../../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import getBiggerGoogleProfilePic from "../../utils/getBiggerGooglePic";
import * as userService from "../../services/authServices";

export default function Login({ onClose }) {
  const { setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = res.data;
        const highResPic = getBiggerGoogleProfilePic(userInfo.picture);
        setUserData({
          email: userInfo.email,
          username: userInfo.name,
          picture: highResPic,
        });
        onClose();
      } catch (error) {
        console.error("Failed to fetch Google user info", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Login Failed:", errorResponse);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await userService.login(formData.email, formData.password);
      setUserData(user);
    } catch (error) {
      alert(error.message);
    }
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
    } catch (error) {
      alert(error.message);
    }

    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

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

            <button type="button" className={styles.btn} onClick={login}>
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
