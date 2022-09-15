import { CSSProperties, useMemo, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.less";
import Login from "./views/Login/Index";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {
  const [windowSize] = useWindowSize();
  const appStyle = useMemo<CSSProperties>(
    () => ({
      height: `${windowSize.height}px`,
    }),
    [windowSize]
  );
  return (
    <div className="app" style={appStyle}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
