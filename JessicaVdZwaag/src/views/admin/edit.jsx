import { useEffect, useState } from "react"

export function ProjectEdit({ id }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gitlink, setGitlink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [projectImg, setProjectImg] = useState(null);
    const [ProjectLanguages, setProjectLanguages] = useState("");

    const formData = new FormData();



    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.append("action", "project");
        formData.append("id", id);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("gitlink", gitlink);
        formData.append("projectLink", projectLink);
        formData.append("ProjectLanguages", ProjectLanguages);

        if (projectImg) {
            formData.append("projectImg", projectImg);
        }

        try {
            const response = await fetch("/php/api/edit.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                console.log(data.message);
            } else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const formData = new FormData();

        formData.append("action", "project");
        formData.append("id", id);

        fetch("/php/api/edit.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setName(data.Name);
                setDescription(data.Description);
                setGitlink(data.GitLink);
                setProjectLink(data.ProjectLink);
                setProjectLanguages(data.ProjectLanguages);
            })
            .catch(err => console.log(err));
    }, [id]);
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>Name</h4>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <h4>Omschrijving</h4>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <label>
                    <h4>GitLink</h4>
                    <input type="text" value={gitlink} onChange={(e) => setGitlink(e.target.value)} />
                </label>
                <label>
                    <h4>projectLink</h4>
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
                    />
                </label>
                <label>
                    <h4>Talen</h4>
                    <input type="text" value={ProjectLanguages} onChange={(e) => setProjectLanguages(e.target.value)} />
                </label>
                <button type="submit">Edit</button>
            </form>
        </section>
    )
}

export function BookEdit({ id }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [category_ID, setCategory_ID] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("action", "book");
        formData.append("id", id);
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("category_ID", category_ID);

        try {
            const response = await fetch("/php/api/edit.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                console.log(data.message);
            } else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const formData = new FormData();

        formData.append("action", "book");
        formData.append("id", id);

        fetch("/php/api/edit.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setTitle(data.Name);
                setAuthor(data.author);
                setDescription(data.description);
                setCategory_ID(data.category_ID);
            })
            .catch(err => console.log(err));
    }, [id]);
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>Title</h4>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    <h4>Auteur</h4>
                    <textarea value={author} onChange={(e) => setAuthor(e.target.value)}></textarea>
                </label>
                <label>
                    <h4>Omschrijving</h4>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    <h4>Category</h4>
                    <input type="number" value={category_ID} onChange={(e) => setCategory_ID(e.target.value)} />
                </label>
                <button type="submit">Edit</button>
            </form>
        </section>
    )
}

export function MeEdit({ id }) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [info, setInfo] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [email, setEmail] = useState("");

    const formData = new FormData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.append("action", "me");
        formData.append("id", id);
        formData.append("Name", name);
        formData.append("Location", location);
        formData.append("Info", info);
        formData.append("GitHub", github);
        formData.append("Linkedin", linkedin);
        formData.append("email", email);
        try {
            const response = await fetch("/php/api/edit.php", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                console.log(data.message);
            } else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const formData = new FormData();

        formData.append("action", "me");
        formData.append("id", id);

        fetch("/php/api/edit.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setName(data.Name);
                setLocation(data.location);
                setInfo(data.info);
                setGithub(data.github);
                setLinkedin(data.linkedin);
                setEmail(data.email);
            })
            .catch(err => console.log(err));
    }, [id]);
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>Naam</h4>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <h4>locatie</h4>
                    <textarea value={location} onChange={(e) => setLocation(e.target.value)}></textarea>
                </label>
                <label>
                    <h4>Omschrijving</h4>
                    <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} />
                </label>
                <label>
                    <h4>github</h4>
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
                </label>
                <label>
                    <h4>Linkedin</h4>
                    <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </label>
                <label>
                    <h4>Email</h4>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button type="submit">Edit</button>
            </form>
        </section>
    )
}