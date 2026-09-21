import { useEffect, useState } from "react";
import styles from "../Books/Books.module.css";

export function Books() {
    const [books, setBooks] = useState([]);
    const [info, setInfo] = useState(null);
    const [category, setCategory] = useState([]);
    const [categoryID, setCategoryID] = useState(0);

    useEffect(() => {
        fetch("http://localhost/api/loadCategories.php")
            .then(res => res.json())
            .then(data => {
                setCategory(data);
            });
    }, []);

    useEffect(() => {
        if (categoryID === null) return;

        fetch(
            `http://localhost/api/loadBooks.php?categoryID=${categoryID}`
        )
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            });
    }, [categoryID]);

    function HandleInfo() {
        if (info != null) {
            return (
                <article className={styles.BookInfo}>
                    <button onClick={() => setInfo(null)}>x</button>
                    <div>
                        <h3>{info.Title}</h3>
                        <h3>{info.Author}</h3>
                        <p>{info.Description}</p>
                    </div>
                </article>
            );
        }
    }

    return (
        <main className={styles.BookMain}>
            <section className={styles.Shelf}>
                    <article className={styles.CategoryContainer}>
                        {category.map((item) => (
                            <button
                                key={item.Id}
                                onClick={() => setCategoryID(item.Id)} className={styles.CategoryItem}
                            >
                                {item.Name}
                            </button>
                        ))}
                    </article>
                <div className={styles.BookContent}>
                    {books.map((item) => (
                        <button
                            key={item.Books_ID}
                            onClick={() => setInfo(item)}
                            className={styles.Book}
                        >
                            <h3>{item.Title}</h3>
                            <p>{item.Author}</p>
                        </button>
                    ))}
                </div>
                <HandleInfo />
            </section>
        </main>
    );
}