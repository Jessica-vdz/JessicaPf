import { useEffect, useState } from "react";
import styles from "../Books/Books.module.css";

export function Books() {
    const [books, setBooks] = useState([]);
    const [info, setInfo] = useState(null);
    const [category, setCategory] = useState([]);
    const [categoryID, setCategoryID] = useState(null);

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
                <article>
                    <button onClick={() => setInfo(null)}>x</button>

                    <div>
                        <h1>{info.Title}</h1>
                        <h3>{info.Author}</h3>
                        <p>{info.Description}</p>
                    </div>
                </article>
            );
        }
    }

    return (
        <main>
            <section>
                {category.map((item) => (
                    <article key={item.Id}>
                        <button
                            onClick={() =>  setCategoryID(item.Id)}
                        >
                            {item.Name}
                        </button>
                    </article>
                ))}
            </section>

            <section>
                {books.map((item) => (
                    <button
                        key={item.Books_ID}
                        onClick={() => setInfo(item)}
                    >
                        <h3>{item.Title}</h3>
                        <p>{item.Author}</p>
                    </button>
                ))}

                <HandleInfo />
            </section>
        </main>
    );
}