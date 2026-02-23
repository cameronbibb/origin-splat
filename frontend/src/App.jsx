import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Bin from "./components/Bin/Bin";
import "./App.css";

function App() {
  return (
    <>
      <div className="unsupported-viewport">Please use a larger screen.</div>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/display/:bin_path" element={<Bin />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
