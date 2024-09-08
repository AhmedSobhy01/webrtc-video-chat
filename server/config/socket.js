const socketIO = require("socket.io");
const syncController = require("../controllers/syncController");

const initSocket = (server) => {
    const io = socketIO(server, { cors: true, origins: "*:*" });

    return new Promise((resolve) => {
        io.on("connection", (socket) => {
            syncController(socket);
        });

        console.log("Socket.IO server started");

        resolve();
    });
};

module.exports = initSocket;
