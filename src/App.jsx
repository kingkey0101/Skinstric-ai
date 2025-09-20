import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <main className="h-screen overflow-hidden flex flex-col">
        <Header />

        <Home />
      </main>
    </>
  );
}

export default App;
