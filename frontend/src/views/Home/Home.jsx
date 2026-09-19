import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css"
import bureau from "../../assets/bureau.png"
import computer from "../../assets/Computor.png"
import closet from "../../assets/closet.png"
export function Home() {
    return (
        <main>
            <section className={styles.MainSection}>
                    <div className={styles.WindowSection}>
                        windo
                    </div>
                    <div className={styles.BureauSection}>
                        <figure>
                            <img src={bureau} alt="bureau" className={styles.BureauImg} />
                        </figure>
                        <Link to={'Projects'}>
                        <img src={computer} alt="" className={styles.ComputerImg}/>
                        </Link>
                </div>
            </section>
            <section>

            </section>
        </main>
    )
}