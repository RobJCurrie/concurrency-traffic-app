import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_BASE_URL} from "../config/apiConfig.js";
import NavigateButton from "../components/NavigateButton.jsx";
import DraggableBlocks from "../components/DraggableBlocks.jsx";


//Function that will shuffle the interactive blocks to a random order
function shuffleBlocks(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function LessonInteractivePage() {

   const {id} = useParams();

    const [lesson, setLesson] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [shuffledBlocks, setShuffledBlocks] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);

    const [isCorrect, setIsCorrect] = useState(null);
    const [loadingProblem, setLoadingProblem] = useState(true);
    const [error, setError] = useState("");

    const checkAnswer = useCallback(() =>{
        if (!blocks.length || !currentOrder.length) return null;

        const correctIDs =  blocks.map((block) => block.id);

        const currentIDs = (currentOrder)
            .filter((block) => !String(block.id).startsWith("d"))
            .map((block) => block.id);

        return (
            correctIDs.length === currentIDs.length &&
            correctIDs.every((id, i) => id === currentIDs[i])
        );
    }, [blocks, currentOrder]);

    useEffect(() => {
        setIsCorrect(checkAnswer());
    }, [checkAnswer]);

    useEffect(() => {
        async function loadInteractiveActivity(){
            try{
                setError("");
                setLoadingProblem(true);

                const res = await fetch(API_BASE_URL+`/api/lessons/${id}`);
                if(!res.ok) throw new Error("Failed to load problem");

                const data = await res.json();
                setLesson(data);

                const loadedBlocks = data?.interactive?.blocks || [];
                const distractorBlocks = data?.interactive?.distractors || [];

                const combined = [...loadedBlocks, ...distractorBlocks];
                const shuffledBlocks = shuffleBlocks(combined);

                setBlocks(loadedBlocks);
                setShuffledBlocks(shuffledBlocks);

                setCurrentOrder(shuffledBlocks);
                setIsCorrect(null);

            }
            catch(err){
                setError(err.message);
            }
            finally {
                setLoadingProblem(false);
            }
        }

        loadInteractiveActivity();
    }, [id]);

    if (loadingProblem) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div className="p-6">


    <div>
        {/* Header */}
        <NavigateButton to={`/home`} label={`Back to Home`} />

        {/* Title */}
        <div className=" text-center">
            <h1 className="text-4xl font-bold">
                {lesson.title}
            </h1>
            <p className="mt-1 text-lg text-gray-500">
                {lesson.description}
            </p>
        </div>
    </div>

            {/*Blocks*/ }
    <div className="p-6">

        <DraggableBlocks blocks={shuffledBlocks} onChange={(order) => { setCurrentOrder(order); setIsCorrect(null);}}/>
    </div>



            {/* Footer */}
        <div className="p-6">
            <div>
                <NavigateButton to={`/lessons/${lesson.id}/simulation`} label={`View Lesson Simulation`} disabled={isCorrect !== true} />
            </div>
        </div>
        </div>
    );
}
