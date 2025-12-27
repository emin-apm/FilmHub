import { getBiggerGoogleProfilePic } from "./getBiggerGooglePic";
import profilImg from "../assets/profilImg.png";

export default function persistUser(user) {
  if (!user) {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    return;
  }

  localStorage.setItem("user", "true");

  const avatar = user.avatar
    ? getBiggerGoogleProfilePic(user.avatar, 450)
    : profilImg;

  localStorage.setItem("avatar", avatar);
}
