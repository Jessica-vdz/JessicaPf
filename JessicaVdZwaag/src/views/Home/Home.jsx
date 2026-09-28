import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css"
import bureau from "../../assets/bureau.png"
import computer from "../../assets/Computor.png"
import game from "../../assets/game.png"
import closet from "../../assets/closet.png"
import books from "../../assets/books.png"
import cooking from "../../assets/cooking.png"
import photo from "../../assets/photo.png"
export function Home() {
    return (
        <main>
            <section className={styles.MainSection}>
                <div className={styles.WindowSection}>
                    
                </div>
                <div className={styles.DeskSection}>
                    <figure>
                        <img src={bureau} alt="bureau" className={styles.BureauImg} />
                    </figure>
                    <Link to={'Projects'}>
                        <img src={computer} alt="" className={styles.ComputerImg} />
                    </Link>
                    <Link to={'Game'}>
                        <img src={game} alt="" className={styles.GameImg} />
                    </Link>
                </div>
            </section>
            <section className={styles.MainSection}>
                <div className={styles.ClosetSection}>
                    <figure>
                        <img src={closet} alt="closet" className={styles.ClosetImg} />
                    </figure>
                    <Link>
                    <img src={cooking} alt="" className={styles.CookingImg}/>
                    </Link>
                    <Link to={'Books'}>
                        <img src={books} alt="books" className={styles.BooksImg}/>
                    </Link>
                    <Link to={'AboutMe'}>
                    <img src={photo} alt="photo" className={styles.PhotoImg}/>
                    </Link>
                </div>
            </section>
        </main>
    )
}