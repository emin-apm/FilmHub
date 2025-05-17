import styles from "./MovieDetailsStyles.module.css";

import { sites } from "../../data/movieSites.json";

export default function MovieSites({ title }) {
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
            <a
              href={`${x.site}${title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check out!
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
