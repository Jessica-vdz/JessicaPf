import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Books/Books.module.css";
import book from "../../assets/book.png";
import shelfEnd from "../../assets/shelfEnd.png"
import close from "../../assets/close.png";

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
                <article className={styles.BookInfo}>
                    <div className={styles.BookHeader}>
                        <div className={styles.Header}>
                            <button onClick={() => setInfo(null)} className={styles.Close}>
                                <img src={close} alt="" className={styles.CloseImg} />
                            </button>
                            <h1 className={styles.font}>{info.Title}</h1>
                        </div>
                        
                        <div className={styles.Rating}>
                            <h2 className={styles.font}>Rating</h2>
                            <h3 className={styles.font}>{info.Author}</h3>

                        </div>
                    </div>
                    <div className={styles.Info}>
                        <p>{info.Description}</p>
                    </div>
                </article >
            );
        }
    }

    return (
        <main className={styles.BookMain}>
            <section className={styles.Shelf}>
                <article className={styles.CategoryContainer}>
                    <div className={styles.CategoryHeader}>
                        <Link to={"/"}>
                            <button>Leave</button>
                        </Link>
                        <h2 className={styles.font}>Category</h2>

                    </div>


                    {category.map((item) => (
                        <button
                            key={item.Id}
                            onClick={() => setCategoryID(item.Id)} className={styles.CategoryItem}
                        >
                            {item.Name}
                        </button>
                    ))}
                </article>
                <article className={styles.BookContainer}>

                    {books.map((item) => (
                        <div className={styles.BookContent} key={item.Books_ID}>
                            <button
                                onClick={() => setInfo(item)}
                                className={styles.Book}
                            >
                                <h3 className={styles.font}>{item.Title}</h3>
                                <p>{item.Author}</p>
                            </button>
                        </div>
                    ))}
                    <div className={styles.ShelfEnd}></div>
                </article>
            </section>
            <section className={styles.AboutBooksContainer}>
                <article className={styles.AboutBooks}>
                    <h1 className={styles.font}>About Books</h1>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla facilis blanditiis veritatis eius rerum pariatur quia quidem libero adipisci quam, alias perferendis, beatae veniam et architecto reiciendis aperiam, suscipit ea.</p>
                    </div>
                </article>
                <HandleInfo />
            </section>
        </main>
    );
}