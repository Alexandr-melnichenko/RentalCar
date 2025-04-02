import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CardPage } from "./pages/CardPage/CardPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showCarsList } from "./redux/slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showCarsList());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
