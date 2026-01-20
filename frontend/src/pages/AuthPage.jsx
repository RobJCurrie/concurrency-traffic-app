import {useEffect, useState} from "react";
import {data} from "autoprefixer";
import {useNavigate} from "react-router-dom";
import {API_BASE_URL} from "../config/apiConfig.js";


export default function AuthPage() {

    const [healthOK, setHealth] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/health`)
            .then(res => {
                if (!res.ok) throw new Error("Error fetching health.");
                return res.text();
                })
            .then(() => setHealth(true))
            .catch(() => setHealth(false));

    }, []);


    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        const url =
            mode === "login"
         ? `${API_BASE_URL}/api/auth/login`
         : `${API_BASE_URL}/api/auth/signup`;

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
                <div className="flex flex-col justify-center">
                    <input placeholder="Email Address" />

                    <input placeholder="Password" />

                    <button onClick={handleSubmit}>Signup</button>
                </div>

            ) }

            {mode === "login" && (
                <div className="flex flex-col justify-center">
                    <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleSubmit}>Login</button>
                </div>

            ) }


            <div className="p-6">
                {mode === "login" ? (
                    <div>
                    <p>Don't have an account yet</p>

                    <button className="underline" onClick={() => setMode("signup")}>Signup</button>
                    </div>
                ) : (
                    <div>
                    <p>Already have an account?</p>

                    <button className="underline" onClick={() => setMode("login")}>Login</button>
                    </div>

                    )}
            </div>


            {healthOK === false && (
                <p style={{color:"red"}}>Backend is offline</p>
            )}

            {healthOK === true && (
                <p style={{color:"green"}}>Backend connected</p>
            )}

        </div>
    )
}