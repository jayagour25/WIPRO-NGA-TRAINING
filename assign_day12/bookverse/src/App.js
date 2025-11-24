import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import "./styles/fade.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="fade">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
