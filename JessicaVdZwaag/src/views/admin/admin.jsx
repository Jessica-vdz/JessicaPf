import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./admin.module.css"
import { BookAdd, MeAdd, ProjectAdd } from "./post";
import { BookEdit, MeEdit, ProjectEdit } from "./edit";

export function Admin() {
    const [status, setStatus] = useState("loading");
    const [userName, setUserName] = useState("");
    const [activeForm, setActiveForm] = useState("");
    const [projects, setProjects] = useState([]);
    const [books, setBooks] = useState([]);
    const [me, setMe] = useState([]);
    const [deleteItem, setDeleteItem] = useState("")
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("/php/api/auth.php", {
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
        fetch("/php/api/loadProjects.php")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
    }, []);

    useEffect(() => {
        fetch("/php/api/loadBooks.php")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            })
    }, []);

    useEffect(() => {
        fetch("/php/api/loadMe.php")
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

    function handleEdit(value, category) {
        setId(value);
        setCategory(category);
        setActiveForm(category)

    }

    async function handleDelete(value, action) {
        setDeleteItem(value)
        setCategory(action);

        const formData = new FormData();

        formData.append("category", action);
        formData.append("deleteItem", value);
        try {
            const response = await fetch("/php/api/delete.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                console.log(data.message);
            }
        } catch (err) {
            console.error(err);
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
                        <button onClick={(e) => handleDelete(item.Project_ID, "projects")}>Verwijderen</button>
                        <button onClick={(e) => handleEdit(item.Project_ID, "projectEdit")}>Edit</button>

                    </div>
                ))}
            </article>

            <article>
                <div className={styles.adminHeader}>
                    <h2>Book</h2>
                    <button onClick={(e) => handleClick("book")}>Toevoegen</button>
                </div>

                <div>
                    {books.map((item) => (
                        <div key={item.Books_ID}>
                            <div className={styles.itemHeader}>
                                <h3>{item.Title}</h3>
                            </div>
                            <button onClick={(e) => handleDelete(item.Books_ID, "book")}>Verwijderen</button>
                            <button onClick={(e) => handleEdit(item.Books_ID, "BookEdit")}>Edit</button>

                        </div>
                    ))}
                </div>

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
                        <div>
                            <button onClick={(e) => handleDelete(item.Me_ID, "me")}>Verwijderen</button>
                            <button onClick={(e) => handleEdit(item.Me_ID, "meEdit")}>Edit</button>

                        </div>

                    </div>
                ))}
            </article>
            {activeForm === "project" && <ProjectAdd />}
            {activeForm === "book" && <BookAdd />}
            {activeForm === "me" && <MeAdd />}

            {activeForm === "projectEdit" && <ProjectEdit id={id} />}
            {activeForm === "BookEdit" && <BookEdit id={id} />}
            {activeForm === "meEdit" && <MeEdit id={id} />}


        </section>
    );
}