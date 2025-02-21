import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GrPowerReset } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
  const { correct,ansCorrect, setCorrect, setExit, setStart, quizzes } = useContext(Auth);
  const [animatedValue, setAnimatedValue] = useState(0); // Start from 0

  const navigateTo = useNavigate();

  const playAgain = () => {
    setExit(false);
  };

  const scorePercentage = (correct / (quizzes.length * 10)) * 100;
  console.log(ansCorrect);
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2; // Increase animation speed (Adjustable)
      if (progress >= scorePercentage) {
        clearInterval(interval);
      }
      setAnimatedValue(progress);
    }, 20); // Adjust timing for smooth animation
    return () => clearInterval(interval);
  }, [scorePercentage]);

  return (
    <div className="w-full h-screen flex relative justify-center items-start ">
      <Link
        to={"/"}
        className=" absolute  top-4  left-4 px-2 md:px-10 flex  items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>

      <div className="container max-w-3xl border shadow-lg mt-16 rounded-lg overflow-hidden pb-4 bg-white flex flex-col items-center">
        <div className="flex  px-4 w-full justify-between items-center h-12 mb-4 border-2 border-b-blue-300">
          <div className="font-semibold pl-2 text-2xl">
            Quiz<span className="text-blue-600">Time</span>
          </div>
          <div>
              <h1>Correct : <span>{ansCorrect}/{quizzes.length}</span></h1>
          </div>
        </div>

        <div className=" flex flex-col items-center">
          <div className="w-60 h-60 relative">
            <CircularProgressbar
              value={animatedValue}
              strokeWidth="5"
              text={`${correct} / ${quizzes.length * 10} `}
              styles={buildStyles({
                pathColor: scorePercentage > 50 ? "#10B981" : "#F59E0B",
                textColor: "#000",
                trailColor: "#D1D5DB",
                strokeLinecap: "round",
                textSize: "18px",
              })}
            />
            {/* {scorePercentage > 70 && ( */}
            <p className="absolute px-2 py-2 rounded-lg top-[0px] bg-blue-800 left-1/2 transform -translate-x-1/2 text-base font-bold text-white">
              Congrates!
            </p>
            {/* )} */}
          </div>

          <div className="flex gap-4">
            {/* Play Again Button */}
            {/* <button
              onClick={()=>navigateTo("/")}
              className="flex items-center gap-2 mt-6 px-6 py-2 border-4 border-blue-200 text-xl font-semibold bg-transparent text-blue-600 rounded-lg hover:bg-blue-400 hover:text-gray-800 transition duration-500"
            >
              <IoHome /> Home
            </button> */}
            <button
              onClick={() => {
                playAgain();
                setCorrect(0);
              }}
              className="flex items-center gap-2 mt-6 px-6 py-2 border-4 border-blue-200 text-xl font-semibold bg-transparent text-blue-600 rounded-lg hover:bg-blue-400 hover:text-gray-800 transition duration-500"
            >
              <GrPowerReset /> Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
