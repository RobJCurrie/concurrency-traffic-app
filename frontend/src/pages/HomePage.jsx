import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const types = ["INTRO", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    useEffect(() => {
        fetch(`http://localhost:8080/api/lessons`)
            .then(res => res.json())
            .then(data => setLessons(data));
    }, []);

    const lessonsByType = useMemo(() => {
        const map = {
            INTRO: [],
            BEGINNER: [],
            INTERMEDIATE: [],
            ADVANCED: [],
        };
        lessons.forEach((l) => {
            console.log(l.level.toUpperCase());
            const key = (l.level || "").toUpperCase();
            if (map[key]) map[key].push(l);
        });
            return map;
        }, [lessons]);

    const activeType = types[activeTab];
    const activeLessons = lessonsByType[activeType] || [];

    const prev = () => setActiveTab((index) => (index === 0 ? types.length - 1 : index - 1));
    const next = () => setActiveTab((index) => (index === types.length - 1 ? 0: index + 1));

    return (

        <div>

            <h1>HOME</h1>

            <div>
                <button onClick={prev}>Prev</button>
                <div>{activeType}</div>
                <button onClick={next}>Next</button>
            </div>

            <div style={{ display: "flex"}}>

                {types.map((type, index) => (
                    <button
                        key={type}
                    onClick={() => setActiveTab(index)}

                    />
                    ))}
            </div>

            <div>

                {activeLessons.length === 0 ? (
                    <div>No lessons found for {activeType}</div>
                ) : (activeLessons.map((lesson) =>
                    <button key={lesson.id} onClick={() => {console.log("clicked: ", lesson); navigate(`/lessons/${lesson.id}`)}}>{lesson.title}</button>
                ))
                }


            </div>


        </div>
    );
}