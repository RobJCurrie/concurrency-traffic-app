import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../config/apiConfig.js";
import BackButton from "../components/NavigateButton.jsx";
import NavigateButton from "../components/NavigateButton.jsx";

export default function LessonPage() {

    const navigate = useNavigate();

    const {id} = useParams();
    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        setLesson(null);

        fetch(`${API_BASE_URL}/api/lessons/${id}`)
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

        <div className="p-6">

            <div>
            {/* Header */}
            <NavigateButton
            to={`/home`}
            label={`Back to Home`}
            />

            {/* Title */}
            <div className=" text-center">
                <h1 className="text-4x1 font-bold">{lesson.title}</h1>
                <p className="mt-1 text-lg text-gray-500">{lesson.description}</p>
            </div>

            </div>


            {/* Content Cards */}

            <div className="p-6">

                <InfoCard
                    title="Term"
                    content={lesson.term}
                />

                <InfoCard
                    title="Analogy"
                    content={lesson.analogy}
                />

                <InfoCard
                    title="Relevance"
                    content={lesson.relevance}
                />


            </div>

            {/* Interactive Exercise */}
            {/* Header */}
            <NavigateButton
                to={`/lessons/${lesson.id}/interactive`}
                label={`Try Interactive Problem`}
            />


            </div>

    )
}

function InfoCard({title, content}) {
    return(
        <div className="rounded-lg p-6 bg-white shadow-md">

            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-gray-600">{content}</p>


        </div>

    );

}