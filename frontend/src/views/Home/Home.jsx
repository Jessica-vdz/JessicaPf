import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css"

export function Home() {
    return (
        <main>
            <div className={styles.MainContent}>
                <section className={styles.HomeSectionBureau}>
                    <Link>
                        <button>Games</button>
                    </Link>
                    <figure className={styles.Projects}>
                        <Link to={'Projects'}>
                            <button className={styles.Computer}>
                                <figure >
                                    Projects
                                </figure>
                            </button>
                        </Link>
                    </figure>
                    <Link to={'AboutMe'}>
                        <button>About me</button>
                    </Link>
                </section>

                <section className={styles.HomeSectionCloset}>
                    <div>
                        <Link>
                            <button>Recipes</button>
                        </Link>
                        <Link to={'Books'}>
                            <button>Books</button>
                        </Link>
                        <Link>
                            <button>Photo Album</button>
                        </Link>
                    </div>
                </section>
            </div>
            <div className={styles.Bottom}>
                Onderkant
            </div>
        </main>
    )
}