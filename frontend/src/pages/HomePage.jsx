import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API_BASE_URL} from "../config/apiConfig.js";

/**Home Page



  */

export default function HomePage() {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(0);

    const [lessons, setLessons] = useState([]);
    const [loadingLessons, setLoadingLessons] = useState(true);

    //Difficulty tiers
    const types = ["INTRO", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    //Fetch the lessons from backend
    useEffect(() => {

        async function loadLessons() {
            try {

                setLoadingLessons(true);

                const res = await fetch(`${API_BASE_URL}/api/lessons`)
                if (!res.ok) {
                    throw new Error(`Failed to load lessons: ${res.status}`);
                }

                const lessons = await res.json();

                setLessons(Array.isArray(lessons) ? lessons : [lessons]);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoadingLessons(false);
            }
        }

        loadLessons();

    }, []);

    //Group the lessons by the difficulty tier
    const lessonsByType = useMemo(() => {

        const map = Object.fromEntries(types.map((type) => [type, []]));

        lessons.forEach((lesson) => {
            console.log(lesson.level.toUpperCase());
            const key = (lesson.level || "").toUpperCase();
            if (map[key]) map[key].push(lesson);
        });
            return map;
        }, [lessons]);



    const TABS = [
        {key: "INTRO", label: "INTRO"},
        {key: "BEGINNER", label: "BEGINNER"},
        {key: "INTERMEDIATE", label: "INTERMEDIATE"},
        {key: "ADVANCED", label: "ADVANCED"},

    ]

    const activeLessons = lessonsByType[activeTab] || [];

    return (

<div>

    <button onClick={() => navigate(`/auth`)}>Log Out</button>

            <h1 className="mt-6">HOME</h1>

    <div className="p-6">
            {/*Tabs Bar*/}
            <ul className="flex flex-wrap justify-center text-sm font-medium text-center">
                {TABS.map((tab) => (
                    <li key={tab.key} className={"me-2"}>
                        <button
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            aria-current={activeTab === tab.key ? "page" : "undefined"}
                            className={[
                                "inline-block px-4 py-2.5 rounded transition",
                                activeTab === tab.key
                                    ? "bg-neutral-500 text-white"
                                    : "hover: text-heading hover:bg-neutral-200",

                            ].join(' ')}>
                            {tab.label}
                        </button>
                    </li>
                ))}
        </ul>



            {/*Lesson Cards*/}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeLessons.slice(0,9).map((lesson) => (
                <button
                type="button"
                key={lesson.id}
                onClick={() => navigate(`/lessons/${lesson.id}`)}
                className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:shadow-md"
                >
                <p className="text-xs">{activeTab}</p>
                <h3 className="mt-1 font-semibold">
                    {lesson.title}
                </h3>
                    <p>
                        {lesson.description}
                    </p>
                </button>
            ))}





        </div>

    </div>
    </div>




    );
}