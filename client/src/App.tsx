import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Header } from "./Components/Header";
import { Entrance } from "./pages/Authentication/Entrance";
import { Signup } from "./pages/Authentication/Signup";
import { Login } from "./pages/Authentication/Login";
import { FeedProvider } from "./contexts/FeedContext";
import { Profile } from "./pages/Profile";
import { Explore } from "./pages/Explore";
import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entrance />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route
              path="home"
              element={
                <FeedProvider>
                  <Feed />
                </FeedProvider>
              }
            />
            <Route
              path="profile/:user_name"
              element={
                <FeedProvider>
                  <Profile />
                </FeedProvider>
              }
            />
            <Route path="explore" element={<Explore />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
