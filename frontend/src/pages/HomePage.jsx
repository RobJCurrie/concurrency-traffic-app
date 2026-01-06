import {useEffect, useMemo, useState} from "react";

export default function HomePage() {

    const [lessons, setLessons] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const types = ["INTRO", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    useEffect(() => {
        fetch("http://localhost:8080/api/lessons")
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
                    <div key={lesson.id}>{lesson.title}</div>
                ))
                }


            </div>


        </div>
    );
}