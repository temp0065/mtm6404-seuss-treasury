import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Book from "../routes/Book.jsx";
import Quotes from "../routes/Quotes.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/book/:id",
        element: <Book />
    },
    {
        path: "/quotes",
        element: <Quotes />
    }
]);

export default router