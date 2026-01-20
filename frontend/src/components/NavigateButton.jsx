import {useNavigate} from "react-router-dom";

export default function NavigateButton({ to = "/lessons", label = "Back"}) {

    const navigate = useNavigate();
    return (

        <button
            onClick={() => navigate(to)}
            className="relative left-6 top-1/2 inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
            {label}
        </button>
    );

}