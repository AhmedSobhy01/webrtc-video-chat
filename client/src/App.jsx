import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Pages/Home";
import Room from "./Pages/Room";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/room/:roomCode",
        element: <Room />,
    },
]);

function App() {
    useEffect(() => {
        document.title = import.meta.env.VITE_APP_NAME;
    }, []);

    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
