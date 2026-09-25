import { use, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import back from "../../assets/back.png";
import file from "../../assets/file.png"
import styles from './Projects.module.css'

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [loadedProject, setLoadedProject] = useState(null);

    useEffect(() => {
        fetch("http://localhost/api/loadProjects.php")
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
                            <img src={file} alt="" className={styles.FilePhotoImg} />
                        </figure>
                        <h3>{item.Name}</h3>
                    </button>
                ))
            )
        } else {
            return (
                <section className={styles.Project}>
                    <div className={styles.Header}>
                        <button onClick={() => { backButton() }} className={styles.BackButton}>
                            <img src={back} alt="" className={styles.BackImg}/>
                        </button>
                        <h2>{loadedProject.Name}</h2>
                    </div>

                </section>
            )
        }

    }

    function backButton() {
        setLoadedProject(null);
    }
    return (
        <main className={styles.ProjectsMain}>
            <section className={styles.FileSection}>
                <div className={styles.FileButtonsContainer}>
                    <button className={styles.FileButton}> - </button>
                    <Link to="/">
                        <button className={styles.FileButton} id={styles.FileCloseButton}> X </button>
                    </Link>
                </div>
                <section className={styles.FileProjectSection}>
                    <div>
                        <h2 className={styles.FileProjectHeader}>Projects</h2>
                    </div>
                    <article className={styles.FileContainer}>
                        <LoadProjects />
                    </article>
                </section>
            </section>
        </main>
    )
}