import { useEffect, useState } from "react"

export function ProjectAdd() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gitlink, setGitlink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [projectImg, setProjectImg] = useState(null);
    const [ProjectLanguages, setProjectLanguages] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!projectImg) {
            console.log("Selecteer eerst een foto")
            return;
        }

        const formData = new FormData();

        formData.append("action", "project");
        formData.append("name", name);
        formData.append("description", description);
        formData.append("gitlink", gitlink);
        formData.append("projectLink", projectLink);
        formData.append("projectLanguages", ProjectLanguages);
        formData.append("projectImg", projectImg);

        try {
            const response = await fetch("http://localhost/api/post.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Opslaan mislukt");
            }

            if (data.success) {
                console.log("Project succesvol toegevoegd!");
            } else {
                console.error(data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>Name</h4>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <h4>Description</h4>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    <h4>Git Link</h4>
                    <input type="text" value={gitlink} onChange={(e) => setGitlink(e.target.value)} />
                </label>
                <label>
                    <h4>Project Link</h4>
                    <input type="text" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                </label>
                <label>
                    <h4>Img</h4>
                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) =>
                            setProjectImg(e.target.files?.[0] ?? null)
                        }
                        required
                    />
                </label>
                <label>
                    <h4>Project Lanuages</h4>
                    <input type="text" value={ProjectLanguages} onChange={(e) => setProjectLanguages(e.target.value)} />
                </label>
                <button type="submit">Toevoegen</button>
            </form>
        </section>
    )
}

export function BookAdd() {
    const [categoryList, setCategoryList] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/loadCategories.php")
            .then(res => res.json())
            .then(data => {
                setCategoryList(data)
            })
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("action", "book");
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("categoryId", categoryId);

        try {
            const response = await fetch("http://localhost/api/post.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Opslaan mislukt");
            }

            if (data.success) {
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <section>
            <form onSubmit={handleClick}>
                <label>
                    <h4>Titel</h4>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    <h4>auteur</h4>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
                <label>
                    <h4>Omschrijving</h4>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Kies de Category</option>
                    {categoryList.map((item) => (
                        <option key={item.Id} value={item.Id}>{item.Name}</option>
                    ))}
                </select>
                <button type="submit">Toevoegen</button>
            </form>
        </section>
    )
}

export function MeAdd() {
    const [name, setName] = useState("");
    const [info, setInfo] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");


    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("action", "me");
        formData.append("name", name);
        formData.append("info", info);
        formData.append("email", email);
        formData.append("github", github);
        formData.append("linkedin", linkedin);
        formData.append("location", location);

        try {
            const response = await fetch("http://localhost/api/post.php", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            const data = await response.json();


            if (data.success) {
                console.log(data.message)
            } else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <section>
            <form onSubmit={handleClick}>
                <label>
                    <h4>Naam</h4>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <label>
                    <h4>Info</h4>
                    <textarea value={info} onChange={(e) => setInfo(e.target.value)}></textarea>
                </label>
                <label>
                    <h4>Contact</h4>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
                    <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </label>
                label
                <button type="submit">Toevoegen</button>
            </form>
        </section>
    )
}