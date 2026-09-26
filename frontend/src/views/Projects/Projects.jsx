import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "../../assets/back.png";
import file from "../../assets/file.png";
import styles from "./Projects.module.css";

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [loadedProject, setLoadedProject] = useState(null);

    const images = {
        Blog: Blog,
    };

    useEffect(() => {
        fetch("http://localhost/api/loadProjects.php")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function handleProjectClick(item) {
        setLoadedProject(item);
        console.log(item);
    }

    function LoadProjects() {
        if (loadedProject == null) {
            return projects.map((item) => (
                <button
                    key={item.Project_ID}
                    className={styles.FileContent}
                    onClick={() => handleProjectClick(item)}
                >
                    <figure className={styles.FilePhoto}>
                        <img
                            src={file}
                            alt=""
                            className={styles.FilePhotoImg}
                        />
                    </figure>

                    <h3>{item.Name}</h3>
                </button>
            ));
        }

        return (
            <section className={styles.LoadedProject}>
                <div className={styles.LoadedProjectsHeader}>
                    <button
                        onClick={backButton}
                        className={styles.backButton}
                    >
                        <img src="" alt="" />
                    </button>

                    <h2>{loadedProject.Name}</h2>
                </div>

                <div className={styles.loadedProjectContent}>
                    <aside className={styles.LoadProjectsDescription}>
                        <p>{loadedProject.Description}</p>
                        <p>{loadedProject.GitLink}</p>
                    </aside>

                    <figure className={styles.ProjectImg}>
                        <img
                            src={images[loadedProject.ProjectImg]}
                            alt={loadedProject.Name}
                        />
                    </figure>
                </div>
            </section>
        );
    }

    function backButton() {
        setLoadedProject(null);
    }

    return (
        <main className={styles.ProjectsMain}>
            <section className={styles.FileSection}>
                <div className={styles.FileButtonsContainer}>
                    <button className={styles.FileButton}>-</button>

                    <Link to="/">
                        <button
                            className={styles.FileButton}
                            id={styles.FileCloseButton}
                        >
                            X
                        </button>
                    </Link>
                </div>

                <section className={styles.FileProjectSection}>
                    <div>
                        <h2 className={styles.FileProjectHeader}>
                            Projects
                        </h2>
                    </div>

                    <article className={styles.FileContainer}>
                        <LoadProjects />
                    </article>
                </section>
            </section>
        </main>
    );
}
