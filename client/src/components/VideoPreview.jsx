import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const VideoPreview = ({ stream, hasVideo, hasAudio, ...props }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    if (!stream)
        return (
            <div className="relative w-full h-full bg-gray-800">
                <div className="flex items-center justify-center w-full h-full">
                    <span className="border h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FontAwesomeIcon icon={faVideoSlash} />
                    </span>
                </div>
            </div>
        );

    return (
        <div className="relative w-full h-full">
            {!hasVideo && (
                <div className="flex items-center justify-center  w-full h-full bg-gray-800 absolute top-0 left-0 z-30">
                    <span className="border h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FontAwesomeIcon icon={faVideoSlash} />
                    </span>
                </div>
            )}

            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" {...props} />

            {!hasAudio && (
                <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full z-50 flex items-center justify-center shadow-xl border">
                    <FontAwesomeIcon icon={faMicrophoneSlash} className="text-red-500" />
                </div>
            )}
        </div>
    );
};

export default VideoPreview;
