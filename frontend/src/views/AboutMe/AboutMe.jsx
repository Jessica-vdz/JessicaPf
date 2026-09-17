import { useEffect, useState } from "react"
import styles from "../AboutMe/AboutMe.module.css";

export function AboutMe() {
    const [me, setMe] = useState([]);

    useEffect(() => {
        fetch("http://localhost/Portfolio/api/loadMe.php")
            .then(res => res.json())
            .then(data => {
                setMe(data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <main className={styles.AboutMeMain}>
            <section className={styles.AboutSection}>
                {me.map((item) => (
                    <article key={item.Me_ID} className={styles.AboutContainer}>
                        <div className={styles.AboutHeader}>
                            <h1>{item.Name}</h1>
                            <h3>{item.Location}</h3>
                        </div>
                        <div className={styles.AboutInfo}>
                            <p>{item.About}</p>
                        </div>
                        <div className={styles.AboutLinks}>
                            <p>{item.Github}</p>
                            <p>{item.Linkedin}</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}