import type { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Agents from "../Agents/Agents";
import JoinTheTeam from "../JoinTheTeam/joinTheTeam";
import "./App.css";
import Agent from "../Agents/Agent";
// import { ToastContainer } from "react-toastify";

const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Agents />} />
        <Route path="/jointheteam" element={<JoinTheTeam />} />
        <Route path="/agent/:id" element={<Agent />}/>
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
