import React, { useContext } from "react";
import Result from "./components/Result";
import Start from "./pages/Home";
import Quiz from "./components/Quiz";
import { Auth } from "./context/AuthContext"; // Import Auth context
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import QuizHistory from "./components/QuizHistory";

function App() {
  const { start, exit } = useContext(Auth);

  return (
    <div className="bg-blue-100">
      <Navbar />
      {/* {exit ? <Result /> : start ? <Quiz /> : <Start />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={exit ? <Result /> : <Quiz /> } />
        {/* <Route path="/quiz/result" element={<Result />} /> */}
        <Route path="/history" element={<QuizHistory />} />
      </Routes>
    </div>
  );
}

export default App;
