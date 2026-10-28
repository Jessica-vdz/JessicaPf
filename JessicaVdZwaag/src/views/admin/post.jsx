import { useState } from "react"

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

            if (data.succes) {
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
                <button type="submit">Post</button>
            </form>
        </section>
    )
}

export function BookAdd() {

}

export function MeAdd() {

}