import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CardPage } from "./pages/CardPage/CardPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
