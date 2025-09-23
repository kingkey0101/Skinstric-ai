import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import TakeTest from "./pages/TakeTest";
import AllowAi from "./pages/AllowAi";
import Demographics from "./pages/Demographics";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<TakeTest />} />
        <Route path="/phaseTwo" element={<AllowAi />} />
        <Route path="/demographics" element={<Demographics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
