import { use, useEffect, useState } from "react"
import styles from './Projects.module.css'

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [loadedProject, setLoadedProject] = useState(null);

    useEffect(() => {
        fetch("http://localhost/Portfolio/api/loadProjects.php")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function handleProjectClick(item) {
        setLoadedProject(item);
        console.log(item);
    }

    function LoadProjects(item) {
        if (loadedProject == null) {
            return (
                projects.map((item) => (
                    <button key={item.Project_ID} className={styles.FileContent} onClick={() => handleProjectClick(item)}>
                        <figure className={styles.FilePhoto}>
                            file
                        </figure>
                    </button>
                ))
            )
        } else {
            return (
                <section>
                    <h2>{loadedProject.Name}</h2>
                </section>
            )
        }

    }
    return (
        <main>
            <section className={styles.FileSection}>
                <div className={styles.FileButtonsContainer}>
                    <button className={styles.FileButton}> -</button>
                    <button className={styles.FileButton} id={styles.FileCloseButton}> X </button>
                </div>
                <section className={styles.FileProjectSection}>
                    <div>
                        <h2 className={styles.FileProjectHeader}>Projects</h2>
                    </div>
                    <article className={styles.FileContainer}>
                        <LoadProjects/>
                    </article>
                </section>
            </section>
        </main>
    )
}