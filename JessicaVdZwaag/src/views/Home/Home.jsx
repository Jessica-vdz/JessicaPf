import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css"
import bureau from "../../assets/bureau.png"
import computer from "../../assets/computor.png"
import game from "../../assets/game.png"
import closet from "../../assets/closet.png"
import books from "../../assets/books.png"
import photo from "../../assets/photo.png"
import day from "../../assets/windowDay.png"
import night from "../../assets/night.png"
import { useState } from "react";
export function Home() {
    const date = new Date();
    const hour = date.getHours();

    const img = hour >= 6 && hour <= 18 ? day : night;

    return (
        <main>
            <section className={styles.MainSection}>

                <div className={styles.DeskSection}>

                    <figure>
                        <img src={bureau} alt="bureau" className={styles.BureauImg} />
                    </figure>
                    <Link to={'Projects'}>
                        <img src={computer} alt="" className={styles.ComputerImg} />
                    </Link>
                    <a href="https://39300.hosts2.ma-cloud.nl/flappybird/" target="_blank">
                        <img src={game} alt="" className={styles.GameImg} />
                    </a>
                    <div className={styles.WindowSection}>
                        <img src={img} alt="" className={styles.WindowImg} />
                    </div>
                </div>
            </section>
            <section className={styles.MainSection}>
                <div className={styles.ClosetSection}>
                    <figure>
                        <img src={closet} alt="closet" className={styles.ClosetImg} />
                    </figure>
                    <Link to={'Books'}>
                        <img src={books} alt="books" className={styles.BooksImg} />
                    </Link>
                    <Link to={'AboutMe'}>
                        <img src={photo} alt="photo" className={styles.PhotoImg} />
                    </Link>
                </div>
            </section>
        </main>
    )
}