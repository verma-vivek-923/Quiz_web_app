import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { openDB } from "idb";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [history, setHistory] = useState([]);
  const { setCorrect } = useContext(Auth);
  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB("QuizDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("attempts")) {
            db.createObjectStore("attempts", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
    };
    initDB();
    fetchHistory();
  }, []);

  // Save Quiz History to IndexedDB
  const saveAttempt = async (score) => {
    const db = await openDB("QuizDB", 1);
    const tx = db.transaction("attempts", "readwrite");
    const store = tx.objectStore("attempts");

    await store.add({
      date: new Date().toLocaleString(),
      score: score,
    });

    await tx.done;
    fetchHistory();
  };

  // Fetch Quiz History from IndexedDB
  const fetchHistory = async () => {
    const db = await openDB("QuizDB", 1);
    const tx = db.transaction("attempts", "readonly");
    const store = tx.objectStore("attempts");
    const allRecords = await store.getAll();
    setHistory(allRecords.reverse()); // Show latest attempts first
  };

  // Reset Quiz
  const resetQuiz = () => {
    setCurrent(0);
    setCorrect(0);
  };

  return (
    <div className="min-h-screen relative w-full">
      <Link
        to={"/"}
        className=" absolute  top-4  left-4 px-2 md:px-10 flex  items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>

      <div className="w-full  flex  flex-col items-center">
        <Box
          current={current}
          next={setCurrent}
          resetQuiz={resetQuiz}
          saveAttempt={saveAttempt}
        />

        {/* Attempt History Section */}
        <div className="w-full max-w-2xl mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">📜 Quiz Attempt History</h2>
          <ul className="mt-2">
            {history.length === 0 ? (
              <p className="text-gray-500">No attempts yet.</p>
            ) : (
              history.map((attempt, index) => (
                <li key={index} className="border-b py-2">
                  <span className="font-semibold">Score:</span> {attempt.score}{" "}
                  |<span className="ml-2 text-gray-500">{attempt.date}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Box = ({ current, next, resetQuiz, saveAttempt }) => {
  const { quizzes, correct,ansCorrect,setAnsCorrect, setCorrect, setExit } = useContext(Auth);
  const [selectedAns, setSelectedAns] = useState(null);
  const [lock, setLock] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedAns(null);
    setLock(false);
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          saveHandler();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current]);

  const checkAns = (answer) => {
    if (!lock) {
      setSelectedAns(answer);
      if (quizzes[current].correct === answer) {
        setCorrect(correct + 10);
        setAnsCorrect(ansCorrect +1)
      } else {
        setCorrect(correct - 2);
      }
      setLock(true);
    }
  };

  const saveHandler = () => {
    if (current + 1 === quizzes.length) {
      saveAttempt(correct + (selectedAns === quizzes[current].correct ? 1 : 0)); // Save Final Score
      setExit(true);
    } else {
      next(current + 1);
    }
    if (current + 1 === quizzes.length) {
      setExit(true);
    } else {
      next(current + 1);
    }
  };

  return (
    <div className="container max-w-3xl bg-slate-100 mx-auto mt-12 flex rounded-2xl overflow-hidden shadow-lg flex-col">
      {/* Timer & Score */}
      <div className="flex py-1 px-6 w-full items-center  h-20 border-2 border-b-blue-300">
        <div className="flex w-full justify-between items-center gap-4">
          {/* Circular Progress Bar */}
          <div className="h-16 w-16">
            <CircularProgressbar
              value={(timeLeft / 30) * 100}
              text={`${timeLeft}s`}
              styles={buildStyles({
                textSize: "30px",
                pathColor: timeLeft < 10 ? "red" : "#3b82f6",
                textColor: "black",
                trailColor: "#d1d5db",
              })}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-0">
            <h1>
              Que : <span>{current + 1}</span> of 10
            </h1>
            <h1>
              Score : <span>{correct}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Question & Options */}
      <div className="w-full py-1 px-8 border shadow-lg rounded-md overflow-hidden">
        <div className="p-2 underline decoration-dashed decoration-blue-400 text-2xl text-left">
          {quizzes[current].question}
        </div>

        <div className="grid gap-4 px-6 md:px-10 mb-8 md:grid-cols-2 mt-8">
          {["a", "b", "c", "d"].map((option) => (
            <div
              key={option}
              className={`py-1 px-2 rounded-lg border-2 border-slate-500 lg:hover:bg-slate-300 duration-200 cursor-pointer 
                ${
                  selectedAns === option
                    ? quizzes[current].correct === option
                      ? "correct"
                      : "wrong"
                    : quizzes[current].correct === option && lock
                    ? "correct"
                    : ""
                }`}
              onClick={() => checkAns(option)}
            >
              {option.toUpperCase()}. {quizzes[current][option]}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mb-8 items-center gap-4">
          <button
            className="border-2 flex items-center text-base gap-2 rounded-md px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white duration-300"
            onClick={resetQuiz}
          >
            <GrPowerReset /> Reset Quiz
          </button>
          <button
            onClick={saveHandler}
            className="border-2 flex items-center text-base gap-2 rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white duration-300"
          >
            Next <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
