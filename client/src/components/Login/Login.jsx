import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";

import styles from "./LoginStyles.module.css";
import UserContext from "../../context/UserContext";
import * as userService from "../../services/authServices";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import profilImg from "../../assets/profilImg.png";
import { loginSchema, registerSchema } from "../../validation/authSchema.js";
import { getBiggerGoogleProfilePic } from "../../utils/getBiggerGooglePic.js";
import persistUser from "../../utils/localStorageUser.js";

export default function Login({ onClose }) {
  const { setUserData } = useContext(UserContext);
  const [isRegistering, setIsRegistering] = useState(false);

  // react-hook-form setup
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegistering ? registerSchema : loginSchema),
  });

  // React Query mutations
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => userService.login(email, password),
    onSuccess: (user) => {
      setUserData({
        avatar: user.avatar || profilImg,
        email: user.email,
        username: user.username,
        movies: user.movies,
        sharedPlaylist: user.sharedPlaylist,
      });
      persistUser(user);
      onClose();
    },
    onError: (error) => console.error("Login failed:", error.message),
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }) => userService.register(email, password),
    onSuccess: (user) => {
      setUserData({
        avatar: user.avatar || profilImg,
        email: user.email,
        username: user.username,
        movies: user.movies,
        sharedPlaylist: user.sharedPlaylist,
      });
      persistUser(user);
      onClose();
    },
    onError: (error) => console.error("Registration failed:", error.message),
  });

  const googleMutation = useMutation({
    mutationFn: (access_token) => userService.googleSign({ access_token }),
    onSuccess: (user) => {
      const normalizedUser = {
        ...user,
        avatar: user.avatar
          ? getBiggerGoogleProfilePic(user.avatar, 450)
          : profilImg,
      };

      setUserData(normalizedUser);

      persistUser(normalizedUser);

      onClose();
    },
    onError: (error) => console.error("Google login failed", error),
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => googleMutation.mutate(response.access_token),
    onError: (err) => console.error("Google login error:", err),
  });

  const onSubmit = (data) => {
    if (isRegistering) {
      registerMutation.mutate({ email: data.email, password: data.password });
    } else {
      loginMutation.mutate({ email: data.email, password: data.password });
    }
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
    <div
      className={styles.modalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        <div className={`${styles.formBox} ${styles.login}`}>
          <h2>{isRegistering ? "Register" : "Login"}</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" {...formRegister("email")} placeholder=" " />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
              <label>Email</label>
            </div>

            {/* Password */}
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                {...formRegister("password")}
                placeholder=" "
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
              <label>Password</label>
            </div>

            {/* Confirm password for register */}
            {isRegistering && (
              <div className={styles.inputBox}>
                <span className={styles.icon}>
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  {...formRegister("confirmPassword")}
                  placeholder=" "
                />
                {errors.confirmPassword && (
                  <p className={styles.error}>
                    {errors.confirmPassword.message}
                  </p>
                )}
                <label>Confirm Password</label>
              </div>
            )}

            <button
              type="submit"
              className={styles.btn}
              disabled={loginMutation.isPending || registerMutation.isPending}
            >
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
