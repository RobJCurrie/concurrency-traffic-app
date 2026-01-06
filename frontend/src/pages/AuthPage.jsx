import {useState} from "react";
import {data} from "autoprefixer";
import {useNavigate} from "react-router-dom";


export default function AuthPage() {

    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        const url =
            mode === "login"
         ? "http://localhost:8080/api/auth/login"
         : "http://localhost:8080/api/auth/signup";

        const body = {email, password};

        try {

            console.log(body);

            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Authentication failed.");
            }

            navigate("/home");
        }
        catch (error) {
            console.error(error);
        }

    }



    return (

        <div>

            <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>

            {mode === "signup" && (
                <div>
                    <input placeholder="Email Address" />

                    <input placeholder="Password" />

                    <button onClick={handleSubmit}>Signup</button>
                </div>

            ) }

            {mode === "login" && (
                <div>
                    <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleSubmit}>Login</button>
                </div>

            ) }


            <div>
                {mode === "login" ? (
                    <div>
                    <p>Don't have an account yet</p>

                    <button onClick={() => setMode("signup")}>Signup</button>
                    </div>
                ) : (
                    <div>
                    <p>Already have an account?</p>

                    <button onClick={() => setMode("login")}>Login</button>
                    </div>

                    )}
            </div>
        </div>
    )
}