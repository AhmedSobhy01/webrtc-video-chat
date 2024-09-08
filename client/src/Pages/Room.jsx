import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import VideoPreview from "../components/VideoPreview";
import VideoControl from "../components/VideoControl";
import FullPageLoader from "../components/FullPageLoader";
import NoUserScreen from "../components/NoUserScreen";
import MeetingLink from "../components/MeetingLink";
import FullPageError from "../components/FullPageError";

let socket = null;

const Room = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { roomCode } = useParams();

    // Local User Video Stream
    const [videoStream, setVideoStream] = useState(null);
    const [videoStreamHasVideo, setVideoStreamHasVideo] = useState(false);
    const [videoStreamHasAudio, setVideoStreamHasAudio] = useState(false);

    // Peer Video Stream
    const [peerVideoStream, setPeerVideoStream] = useState(null);
    const [peerVideoStreamHasVideo, setPeerVideoStreamHasVideo] = useState(false);
    const [peerVideoStreamHasAudio, setPeerVideoStreamHasAudio] = useState(false);

    // WebRTC Peer Connection
    const peerConnection = useRef(
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        })
    );

    // Room Verification and Joining
    useEffect(() => {
        const verifyRoom = async (password) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/room/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ roomCode, password }),
                });
                const data = await response.json();

                if (!data.status) throw new Error(data.message);
            } catch (error) {
                throw new Error(error.message);
            }
        };

        if (socket) {
            socket.disconnect();
            socket = null;
        }

        const userId = Math.random().toString(36);
        const password = getPassword();

        verifyRoom(password)
            .then(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                    setVideoStream(stream);

                    setVideoStreamHasVideo(stream.getVideoTracks().some((track) => track.enabled));
                    setVideoStreamHasAudio(stream.getAudioTracks().some((track) => track.enabled));

                    stream.getTracks().forEach((track) => {
                        peerConnection.current.addTrack(track, stream);
                    });

                    socket = io(import.meta.env.VITE_API_URL);

                    bindEvents();

                    socket.emit("join-room", { roomCode, password, userId });
                });
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => {
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        };
    }, [roomCode]);

    const getPassword = () => {
        // Check if password is in URL and set it in localStorage
        const urlParams = new URLSearchParams(window.location.search);
        let urlPassword = urlParams.get("password");

        if (urlPassword) {
            try {
                urlPassword = atob(urlPassword);
            } catch {
                urlPassword = null;
            }
        }

        if (urlPassword) {
            localStorage.setItem("password", urlPassword);
            window.history.replaceState({}, document.title, window.location.pathname); // Remove query params from URL
        }

        return localStorage.getItem("password") ?? null;
    };

    // WebRTC Peer Connection Events and Handlers
    const bindEvents = () => {
        socket.on("user-connected", () => {
            peerConnection.current
                .createOffer()
                .then((offer) => {
                    peerConnection.current.setLocalDescription(offer);
                    return offer;
                })
                .then((offer) => {
                    socket.emit("offer", offer);
                });
        });

        socket.on("user-disconnected", () => {
            setPeerVideoStream(null);
        });

        socket.on("offer", (offer) => {
            peerConnection.current
                .setRemoteDescription(new RTCSessionDescription(offer))
                .then(() => peerConnection.current.createAnswer())
                .then((answer) => {
                    peerConnection.current.setLocalDescription(answer);
                    return answer;
                })
                .then((answer) => {
                    socket.emit("answer", answer);
                });
        });

        socket.on("answer", (answer) => {
            peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on("candidate", (candidate) => {
            if (peerConnection.current.signalingState === "stable") peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.on("stateChange", ({ hasVideo, hasAudio }) => {
            setPeerVideoStreamHasVideo(hasVideo);
            setPeerVideoStreamHasAudio(hasAudio);
        });

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) socket.emit("candidate", event.candidate);
        };

        peerConnection.current.ontrack = (event) => {
            setPeerVideoStream(event.streams[0]);

            setPeerVideoStreamHasVideo(event.streams[0].getVideoTracks().length > 0);
            setPeerVideoStreamHasAudio(event.streams[0].getAudioTracks().length > 0);
        };

        peerConnection.current.onconnectionstatechange = () => {
            if (peerConnection.current.connectionState === "disconnected" || peerConnection.current.connectionState === "closed") setPeerVideoStream(null);
        };
    };

    const unbindEvents = () => {
        socket.off("user-connected");
        socket.off("user-disconnected");
        socket.off("offer");
        socket.off("answer");
        socket.off("candidate");
        socket.off("stateChange");

        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.onconnectionstatechange = null;
    };

    // Video and Audio Toggle Handlers
    const handleVideoToggle = () => {
        peerConnection.current.getSenders().forEach((sender) => {
            if (sender?.track?.kind === "video") {
                sender.track.enabled = !videoStreamHasVideo;
            }
        });

        socket.emit("stateChange", {
            hasVideo: !videoStreamHasVideo,
            hasAudio: videoStreamHasAudio,
        });

        setVideoStreamHasVideo(!videoStreamHasVideo);
    };

    const handleMuteToggle = () => {
        peerConnection.current.getSenders().forEach((sender) => {
            if (sender?.track?.kind === "audio") {
                sender.track.enabled = !videoStreamHasAudio;
            }
        });

        socket.emit("stateChange", {
            hasVideo: videoStreamHasVideo,
            hasAudio: !videoStreamHasAudio,
        });

        setVideoStreamHasAudio(!videoStreamHasAudio);
    };

    // End Call Handler
    const handleEndCall = () => {
        unbindEvents();
        localStorage.removeItem("password");
        navigate("/");
    };

    if (isLoading) return <FullPageLoader />;

    if (error) return <FullPageError error={error} />;

    return (
        <div className="h-screen relative">
            <div className="h-full w-full">
                {!peerVideoStream && <NoUserScreen />}
                {peerVideoStream && <VideoPreview stream={peerVideoStream} hasVideo={peerVideoStreamHasVideo} hasAudio={peerVideoStreamHasAudio} />}
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 top-6 md:left-6 z-40 border w-[300px] h-[200px] shadow-xl">
                <VideoPreview stream={videoStream} hasVideo={videoStreamHasVideo} hasAudio={videoStreamHasAudio} />
            </div>

            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 z-50 space-y-3">
                <MeetingLink roomCode={roomCode} />
                <VideoControl isVideoOn={videoStreamHasVideo} isMicOn={videoStreamHasAudio} onToggleVideo={handleVideoToggle} onToggleMute={handleMuteToggle} onEndCall={handleEndCall} />
            </div>
        </div>
    );
};

export default Room;
