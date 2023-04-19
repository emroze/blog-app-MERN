import "./index.css";
import Post from "./Post.jsx";
import Header from "./Header.jsx";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
