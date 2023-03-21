import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Header } from "./Components/Header";
import { Entrance } from "./pages/Authentication/Entrance";
import { Signup } from "./pages/Authentication/Signup";
import { Login } from "./pages/Authentication/Login";
import { FeedProvider } from "./contexts/FeedContext";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entrance />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route
            path="/home"
            element={
              <FeedProvider>
                <Feed />
              </FeedProvider>
            }
          />
          <Route
            path="/profile/:user_name"
            element={
              <FeedProvider>
                <Profile />
              </FeedProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
