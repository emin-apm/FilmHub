import styles from "./MovieDetailsStyles.module.css";
import { Link } from "react-router-dom";

import { sites } from "../../data/movieSites.json";

export default function MovieSites() {
  return (
    <div className={styles.movieSites}>
      <div className={styles.siteContainer}>
        {sites.map((x) => (
          <div className={styles.siteBox} key={x.id}>
            <span>{x.name} </span>
            {x.language === "BG" && (
              <span>
                <img src="https://flagcdn.com/16x12/bg.png" alt="BG Flag" />
                {x.language}
              </span>
            )}
            {x.language === "TR" && (
              <span>
                <img src="https://flagcdn.com/16x12/tr.png" alt="TR Flag" />
                {x.language}
              </span>
            )}
            {x.language === "EN" && (
              <span>
                <img src="https://flagcdn.com/16x12/gb.png" alt="GB Flag" />
                {x.language}
              </span>
            )}
            <span>720p</span>
            <Link to={x.site} target="_blank">
              Check out!
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
