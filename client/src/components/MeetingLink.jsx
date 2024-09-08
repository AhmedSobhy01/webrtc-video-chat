import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingLink = ({ roomCode }) => {
    const link = `${window.location.origin}/room/${roomCode}?password=${btoa(localStorage.getItem("password"))}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(link);

        toast.success("Link copied to clipboard", {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-full max-w-sm bg-gray-100 rounded-md">
                    <div className="text-sm text-gray-500 px-5 py-3 text-center w-full">
                        <span className="font-semibold break-words">{link}</span>

                        <button type="button" className="text-blue-500 hover:text-blue-600 ml-3" onClick={handleCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingLink;
