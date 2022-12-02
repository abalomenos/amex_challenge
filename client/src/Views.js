import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default Views;