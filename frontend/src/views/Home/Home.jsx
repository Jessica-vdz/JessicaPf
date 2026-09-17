import { Link } from "react-router-dom";

export function Home() {
    return (
        <main>
            <Link to={'Projects'}>
                <button>Projects</button>
            </Link>
            <Link>
                <button>Recipes</button>
            </Link>
            <Link>
                <button>Books</button>
            </Link>
            <Link>
                <button>Photo Album</button>
            </Link>
            <Link>
                <button>Games</button>
            </Link>
            <Link to={'AboutMe'}>
                <button>About me</button>
            </Link>
        </main>
    )
}