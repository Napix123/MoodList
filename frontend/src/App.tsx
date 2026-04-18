import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Library from "./pages/Library";
import Result from "./pages/Playlist";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/library" element={<Library />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;