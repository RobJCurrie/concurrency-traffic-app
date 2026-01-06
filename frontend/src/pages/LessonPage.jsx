import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function LessonPage() {

    const {id} = useParams();
    const [lesson, setLesson] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        setLesson(null);

        fetch(`http://localhost:8080/api/lessons/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch lesson.");
                return res.json();
            })
            .then((data) => setLesson(data))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
        </div>
    )
}