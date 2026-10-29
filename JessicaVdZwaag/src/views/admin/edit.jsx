import { useEffect, useState } from "react"

export function ProjectEdit({ id }) {
    const [projects, setProjects] = useState([]);
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
        formData.append("projectImg", projectImg);
        formData.append("ProjectLanguages", ProjectLanguages);

        if (projectImg) {
            formData.append("projectImg", projectImg);
        }

        try {
            const response = await fetch("http://localhost/api/edit.php", {
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
        
        formData.append("action", "getProject");
        formData.append("id", id);

        fetch("http://localhost/api/edit.php", {
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

export function BookEdit() {

}