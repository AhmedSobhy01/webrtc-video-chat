import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faPhone } from "@fortawesome/free-solid-svg-icons";

const VideoControl = ({ isVideoOn, isMicOn, onToggleVideo, onToggleMute, onEndCall, className = "", ...props }) => {
    return (
        <div className={`py-2 flex items-center justify-center gap-8 ${className}`} {...props}>
            <button type="button" className={`bg-white h-14 w-14 border rounded-full text-xl flex items-center justify-center shadow-xl ${isMicOn ? "text-black" : "text-red-500"}`} onClick={onToggleMute}>
                <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
            </button>

            <button type="button" className="bg-red-500 text-white p-5 rounded-2xl text-3xl flex items-center justify-center shadow-xl" onClick={onEndCall}>
                <FontAwesomeIcon icon={faPhone} className="transform rotate-[135deg] mt-1" />
            </button>

            <button type="button" className={`bg-white h-14 w-14 border rounded-full text-xl flex items-center justify-center shadow-xl ${isVideoOn ? "text-black" : "text-red-500"}`} onClick={onToggleVideo}>
                <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
            </button>
        </div>
    );
};

export default VideoControl;
