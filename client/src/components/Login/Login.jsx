import { useContext, useEffect, useState } from "react";
import styles from "./LoginStyles.module.css";
import UserContext from "../../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { lockScroll, unlockScroll } from "../../utils/scrollLock,js";

export default function Login({ onClose }) {
  const { setUserData } = useContext(UserContext);

  const [email, setEmail] = useState();

  function getBiggerGoogleProfilePic(url, size = 250) {
    return url.replace(/s\d+-c$/, `s${size}-c`);
  }
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token Response:", tokenResponse);
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
        console.log(highResPic);
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData((prev) => ({
      ...prev,
      email: email,
      username: email.split("@")[0],
    }));

    onClose();
  };

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <div className={`${styles.formBox} ${styles.login}`}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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

            <button
              type="button"
              className={styles.btn}
              onClick={() => login()}
            >
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
