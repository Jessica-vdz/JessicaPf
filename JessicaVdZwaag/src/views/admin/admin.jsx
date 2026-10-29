import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./admin.module.css"
import { BookAdd, MeAdd, ProjectAdd } from "./post";

export function Admin() {
    const [status, setStatus] = useState("loading");
    const [userName, setUserName] = useState("");
    const [activeForm, setActiveForm] = useState("");
    const [projects, setProjects] = useState([]);
    const [books, setBooks] = useState([]);
    const [me, setMe] = useState([]);
    const [deleteItem, setDeleteItem] = useState("")
    const [category ,setCategory] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/auth.php", {
            credentials: "include"
        })
            .then(async (response) => {
                if (response.status === 401) {
                    setStatus("denied");
                    return;
                }

                if (!response.ok) {
                    setStatus("error");
                    return;
                }

                const data = await response.json();
                setUserName(data.user.userName);
                setStatus("allowed");
            })
            .catch(() => setStatus("error"));
    }, []);

    useEffect(() => {
        fetch("http://localhost/api/loadProjects.php")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost/api/loadBooks.php")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost/api/loadMe.php")
            .then(res => res.json())
            .then(data => {
                setMe(data);
            })
    }, []);
    if (status === "loading") return <p>Laden...</p>;
    if (status === "denied") return <Navigate to="/" replace />;
    if (status === "error") return <p>Er ging iets mis.</p>;

    function handleClick(value) {
        setActiveForm(value)
    }

    function handleDelte(value, action) {
        setDeleteItem(value)
        setCategory(action);

        const formData = new FormData();

        formData.append("category", category);
        formData.append("deleteItem", deleteItem)
        try {

        const response = fetch("http://localhost/api/delete.php", {
            method: "POST",
            credentials:"include",
            body : formData
        })
        .then(res => res.json())

        const data = response.json();
        if (data.success) {
            console.log(data.message);
        } else {
            console.log(data.message);
        }
    }
    catch(err) {
        console.log(err);
    }
    }
    return (
        <section className={styles.adminMain}>
            <article>
                <div className={styles.adminHeader}>
                    <h2>Projects</h2>
                    <button onClick={(e) => handleClick("project")}>Toevoegen</button>
                </div>
                {projects.map((item) => (
                    <div key={item.Project_ID}>
                        <div className={styles.itemHeader}>
                            <h3>{item.Name}</h3>
                        </div>
                    </div>
                ))}
            </article>

            <article>
                <div className={styles.adminHeader}>
                    <h2>Book</h2>
                    <button onClick={(e) => handleClick("book")}>Toevoegen</button>
                </div>
                {books.map((item) => (
                    <div key={item.Books_ID}>
                        <div className={styles.itemHeader}>
                            <h3>{item.Title}</h3>
                        </div>
                    </div>
                ))}
            </article>

            <article>
                <div className={styles.adminHeader}>
                    <h2>Me</h2>
                    <button onClick={(e) => handleClick("me")}>Toevoegen</button>
                </div>
                {me.map((item) => (
                    <div key={item.Me_ID}>
                        <div className={styles.itemHeader}>
                            <h3>{item.Name}</h3>
                        </div>
                        <button onClick={(e) => handleDelte(item.Me_ID, "me")}>Verwijderen</button>
                    </div>
                ))}
            </article>
            {activeForm === "project" && <ProjectAdd />}
            {activeForm === "book" && <BookAdd />}
            {activeForm === "me" && <MeAdd />}
        </section>
    );
}