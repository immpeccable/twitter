import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Header } from "./Components/Header";
import { Entrance } from "./pages/Authentication/Entrance";
import { Signup } from "./pages/Authentication/Signup";
import { Login } from "./pages/Authentication/Login";
import { Profile } from "./pages/Profile";
import { Explore } from "./pages/Explore";
import Layout from "./Components/Layout";
import { TweetsOfUser } from "./pages/Profile/tweets";
import { LikesOfUser } from "./pages/Profile/likes";

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
            <Route path="home" element={<Feed />} />
            <Route path="profile/:user_name" element={<Profile />}>
              <Route path="" element={<TweetsOfUser />} />
              <Route path="likes" element={<LikesOfUser />} />
              <Route path="replies" element={<TweetsOfUser />} />
              <Route path="followings" element={<TweetsOfUser />} />
              <Route path="followers" element={<TweetsOfUser />} />
            </Route>
            <Route path="explore" element={<Explore />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
