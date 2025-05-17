import styles from "./MovieDetailsStyles.module.css";
import { sites } from "../../data/movieSites.json";

export default function MovieSites({ title }) {
  return (
    <div className={styles.movieSite}>
      <table className={styles.siteBox}>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Language</th>
            <th>Quality</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>
                {x.language === "BG" && (
                  <>
                    <img src="https://flagcdn.com/16x12/bg.png" alt="BG Flag" />
                    {x.language}
                  </>
                )}
                {x.language === "TR" && (
                  <>
                    <img src="https://flagcdn.com/16x12/tr.png" alt="TR Flag" />
                    {x.language}
                  </>
                )}
                {x.language === "EN" && (
                  <>
                    <img src="https://flagcdn.com/16x12/gb.png" alt="GB Flag" />
                    {x.language}
                  </>
                )}
              </td>
              <td>720p</td>
              <td>
                <a
                  href={`${x.site}${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.checkButton}
                >
                  Watch now!
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
