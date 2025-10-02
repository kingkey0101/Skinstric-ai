import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import TakeTest from "./pages/TakeTest";
import AllowAi from "./pages/AllowAi";
import Demographics from "./pages/Demographics";
import AttributesSelection from "./pages/AttributesSelection";

function App() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* responsive */}
          <Route path="/" element={<Home />} /> 
          {/* responsive */}
          <Route path="/home" element={<Home />} />
          {/* responsive */}
          <Route path="/test" element={<TakeTest />} />
          {/* responsive */}
          <Route path="/phaseTwo" element={<AllowAi />} />
          {/* responsive */}
          <Route path="/select-attributes" element={<AttributesSelection />} />
          
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
