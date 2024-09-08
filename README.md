<h1 align="center">🎥📞 WebRTC Video & Audio Chat App</h1>

## 🌟 Overview

This application uses WebRTC to enable real-time video and audio calls between two peers. Users can create a room with a unique code and password, then share the room details or link with a friend to initiate secure peer-to-peer video and audio calls. The backend is powered by a Node.js server utilizing Socket.IO, and the frontend is a React-based client.

## 🚀 Features

-   **🔍 Peer-to-Peer Video and Audio Calls:** Empower users to have direct video and audio interactions with each other using WebRTC, offering a seamless communication experience.
-   **🛠 Room Creation and Management:** Users can effortlessly create and manage rooms with unique codes and passwords. Room information is stored in MongoDB, allowing for scalability and persistence.

-   **🔒 Secure Access:** Ensure that only users with the correct room code and password can join a room, providing a private and secure environment for communication.

-   **⚡ Real-Time Signaling with Socket.IO:** Use Socket.IO for efficient real-time signaling between peers, ensuring smooth and reliable WebRTC connections.

-   **🌐 Modern User Interface:** The React front-end provides a responsive and intuitive user interface for an enhanced user experience.

-   **🌍 Efficient NAT Traversal:** Utilize Google’s STUN server to gather ICE candidates, facilitating the connection between peers through Network Address Translation (NAT) and firewalls.

## 🌐 Live Demo

A demo of this application is hosted at [webrtc-video-chat.ahmedsobhy.net](https://webrtc-video-chat.ahmedsobhy.net). You can visit this URL to see the application in action.

## 📂 Repository Structure

-   `server/`: Contains the Node.js backend server code. Uses Socket.IO to handle signaling and connects to MongoDB for managing room data.
-   `client/`: Contains the React frontend code. Users can create and join rooms, as well as manage video and audio streams.

## 🚀 Getting Started

### ⚙️ Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AhmedSobhy01/webrtc-video-chat.git
    cd webrtc-video-chat
    ```

2. **Navigate to the server directory and install dependencies:**

    ```bash
    cd server
    npm install
    cp .env.example .env
    ```

3. **Navigate to the client directory and install dependencies:**

    ```bash
    cd ../client
    npm install
    cp .env.example .env
    ```

4. **Start the server:**

    Navigate to the `server` directory and run:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.

5. **Start the client:**

    Navigate to the `client` directory and run:

    ```bash
    npm start
    ```

    The client will be running on `http://localhost:3000`.

## 📋 Usage

1. **Create a Room:**

    - Open the client app in your browser (`http://localhost:3000`).
    - Enter a room code and password, then click "Create Room".
    - Share the room code and password with a friend.

2. **Join a Room:**

    - Open the client app in another browser window or device.
    - Enter the room code and password provided by the creator.
    - Click "Join Room" to enter the video call.

## 🛠 Technologies Used

-   **WebRTC:** Enables real-time peer-to-peer communication.
-   **Socket.IO:** Facilitates signaling to establish WebRTC connections.
-   **Node.js:** Serves the backend functionality.
-   **React:** Provides a modern front-end interface with which users can interact.
-   **MongoDB:** Stores room data for persistence and management.

## 📜 License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.
