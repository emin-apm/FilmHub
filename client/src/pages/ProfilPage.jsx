import { useContext } from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import UserContext from "../context/UserContext";

export default function ProfilPage() {
  const { userData, setUserData } = useContext(UserContext);
  return <UserProfile userData={userData} setUserData={setUserData} />;
}
