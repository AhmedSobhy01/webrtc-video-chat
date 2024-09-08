const Room = require("../models/Room");

const syncController = (socket) => {
    socket.on("join-room", async ({ roomCode, password, userId }) => {
        if (!roomCode || !password || !userId) {
            socket.disconnect();
            return;
        }

        let room = await Room.findOne({ code: roomCode });

        if (!room || room.password !== password || room.users.length >= 2 || room.users.includes(userId)) {
            socket.disconnect();
            return;
        }

        socket.join(roomCode);

        room.users.push(userId);
        await room.save();

        socket.to(roomCode).emit("user-connected", userId);

        socket.on("offer", (data) => {
            socket.to(roomCode).emit("offer", data);
        });

        socket.on("answer", (data) => {
            socket.to(roomCode).emit("answer", data);
        });

        socket.on("candidate", (data) => {
            socket.to(roomCode).emit("candidate", data);
        });

        socket.on("stateChange", (data) => {
            socket.to(roomCode).emit("stateChange", data);
        });

        socket.on("disconnect", async () => {
            room = await Room.findOne({ code: roomCode });

            if (room) {
                room.users = room.users.filter((id) => id !== userId);
                await room.save();

                if (room.users.length === 0) await Room.deleteOne({ code: roomCode });
            }

            socket.to(roomCode).emit("user-disconnected", userId);
        });
    });
};

module.exports = syncController;
