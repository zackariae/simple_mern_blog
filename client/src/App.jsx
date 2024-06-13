import "./App.css";
import Post from "./components/Post";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import { UserContextProvider } from "./components/Usercontext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import PostEdit from "./pages/PostEdit";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<PostEdit />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
