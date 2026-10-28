import { useState } from "react";
import styles from "./login.module.css"
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userName, password })
            })
            const data = await response.json();

            if (data.success) {
                setMessage("succesvol!");
                sessionStorage.setItem("userName", data.user.userName);
                navigate("/admin");
            } else {
                setMessage(data.message || "Inloggen mislukt");
            }
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    return (
        <section>
            <form onSubmit={handleClick}>
                <label>
                    <h4>GebruikersNaam</h4>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label>
                    <h4>Wachtwoord</h4>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button disabled={loading} type="submit">{loading ? "Bezig ..." : "login"}</button>
            </form>
            {message && <p>{message}</p>}
        </section>
    )
}