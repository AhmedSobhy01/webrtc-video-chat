import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState("");
    const [password, setPassword] = useState("");

    const [roomCodeError, setRoomCodeError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleCreateRoom = async () => {
        try {
            setRoomCodeError("");
            setPasswordError("");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/room/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roomCode, password }),
            });

            const data = await response.json();
            if (!data.status) {
                if (data.errors) {
                    data.errors.forEach((error) => {
                        if (error.path === "roomCode") setRoomCodeError(error.msg);

                        if (error.path === "password") setPasswordError(error.msg);
                    });

                    return;
                }

                throw new Error(data.message);
            }

            localStorage.setItem("password", password);
            navigate(`/room/${roomCode}`);
        } catch (error) {
            setPasswordError(error.message);
        }
    };

    const handleJoinRoom = async () => {
        try {
            setRoomCodeError("");
            setPasswordError("");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/room/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roomCode, password }),
            });

            const data = await response.json();
            if (!data.status) {
                if (data.errors) {
                    data.errors.forEach((error) => {
                        if (error.path === "roomCode") setRoomCodeError(error.msg);

                        if (error.path === "password") setPasswordError(error.msg);
                    });

                    return;
                }

                throw new Error(data.message);
            }

            localStorage.setItem("password", password);

            navigate(`/room/${roomCode}`);
        } catch (error) {
            setPasswordError(error.message);
        }
    };

    return (
        <div className="h-screen h-dvh flex items-center justify-center px-2">
            <div className="flex flex-col items-center justify-center gap-8 text-white bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg min-w-md">
                <div className="flex items-center gap-4 text-4xl md:text-5xl">
                    <FontAwesomeIcon icon={faComments} />
                    <h1 className="font-bold select-none">Video Chat</h1>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="space-y-1 w-full">
                            <input type="text" placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} className="px-4 py-2 rounded-md bg-gray-800 w-full" />
                            {roomCodeError && <p className="text-red-500 text-sm">{roomCodeError}</p>}
                        </div>

                        <div className="space-y-1 w-full">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 rounded-md bg-gray-800 w-full" />
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center  w-full">
                        <button type="button" onClick={handleCreateRoom} className="px-4 py-2 bg-blue-600 rounded-lg shadow-md w-full">
                            Create Room
                        </button>

                        <button type="button" onClick={handleJoinRoom} className="px-4 py-2 bg-green-600 rounded-lg shadow-md w-full">
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
