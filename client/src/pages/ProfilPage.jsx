import { useContext } from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import UserContext from "../context/UserContext";

export default function ProfilPage() {
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);
  return <UserProfile userData={userData} setUserData={setUserData} />;
}
