import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

const NoUserScreen = () => {
    return (
        <div className="grid place-items-center h-full">
            <FontAwesomeIcon icon={faUserSlash} className="text-5xl text-gray-300" />
        </div>
    );
};

export default NoUserScreen;
