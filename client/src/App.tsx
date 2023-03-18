import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Header } from "./Components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
