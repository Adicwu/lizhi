import { Route, Routes } from "react-router-dom";
import "./App.less";
import Login from "./views/Login/Index";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
