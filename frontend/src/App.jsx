import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Bin from "./components/Bin/Bin";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/display/:bin_path" element={<Bin />}></Route>
    </Routes>
  );
}

export default App;
