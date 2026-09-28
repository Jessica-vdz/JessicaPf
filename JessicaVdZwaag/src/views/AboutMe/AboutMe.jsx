import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from "../AboutMe/AboutMe.module.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import close from "../../assets/close.png"
export function AboutMe() {
    const [me, setMe] = useState([]);

    useEffect(() => {
        fetch("/php/api/loadMe.php")
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
                            <a href="https://github.com/Jessica-vdz" target="_blank" className={styles.AboutLinksA}>
                                <img src={github} alt="" className={styles.AboutLinksImg} />
                            </a>
                            <a href="" target="_blank" className={styles.AboutLinksA}>
                                <img src={linkedin} alt="" className={styles.AboutLinksImg} />
                            </a>
                        </div>
                    </article>
                ))}
                <article className={styles.AboutMeImgContainer}>
                    <p className={styles.AboutMeImg}>h</p>
                </article>
                <button className={styles.closeButton}>
                    <Link to="/">
                    <img src={close} alt="" className={styles.closeButtonImg}/>
                    </Link>
                </button>

            </section>
        </main>
    )
}