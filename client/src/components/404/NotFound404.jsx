import { Link } from "react-router-dom";
import styles from "./NotFound404Styles.module.css";

export default function NotFound404() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div>
          <h1>404</h1>
          <h2>John Travolta is lost... your page is too :/</h2>
        </div>
        <Link to={"/"}>
          <div className={styles.button}>Go back to home</div>
        </Link>
      </div>
      <div className={styles.media}>
        <img
          class="gif"
          src="https://media.tenor.com/nEP6ovplEd8AAAAi/so-really.gif"
          alt="Confused John Travolta"
        ></img>
      </div>
    </div>
  );
}
