import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from "../AboutMe/AboutMe.module.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import close from "../../assets/close.png"
import ik from "../../assets/ik.jpg"
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
                            <h3 className={styles.AboutHeaderSub}>{item.Location}</h3>
                        </div>
                        <div className={styles.AboutInfo}>
                            <p>{item.About}</p>
                        </div>
                        <div>
                            <h3 className={styles.AboutHeaderSub}>Contact </h3>
                            <div className={styles.AboutInfo}>
                                <p>Tel: +31 06 28817443</p>
                                <p>Email: Jessicavdz03@gmail.com</p>
                            </div>
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
                    <img src={ik} alt="" />
                    <div className={styles.skillsContainer}>
                        <h2 className={styles.AboutHeader}> Skills </h2>
                        <div className={styles.skillsContent}>
                            <p className={styles.skills}>React</p>
                            <p className={styles.skills}>HTML</p>
                            <p className={styles.skills}>CSS</p>
                            <p className={styles.skills}>JavaScript</p>
                            <p className={styles.skills}>PHP</p>
                            <p className={styles.skills}>C</p>
                            <p className={styles.skills}>C#</p>
                        </div>
                    </div>
                </article>
                <button className={styles.closeButton}>
                    <Link to="/">
                        <img src={close} alt="" className={styles.closeButtonImg} />
                    </Link>
                </button>

            </section>
        </main>
    )
}