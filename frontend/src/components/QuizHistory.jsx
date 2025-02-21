import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetch Quiz History from IndexedDB
  const fetchHistory = async () => {
    const db = await openDB("QuizDB", 1);
    const tx = db.transaction("attempts", "readonly");
    const store = tx.objectStore("attempts");
    const allRecords = await store.getAll();
    setHistory(allRecords.reverse()); // Show latest attempts first
  };

  // Clear History
  const clearHistory = async () => {
    const db = await openDB("QuizDB", 1);
    const tx = db.transaction("attempts", "readwrite");
    await tx.objectStore("attempts").clear();
    await tx.done;
    setHistory([]);
  };

  return (
    <div className="w-full h-screen flex relative flex-col items-center">
      <Link
        to={"/"}
        className=" absolute  top-4  left-4 px-2 md:px-10 flex  items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>

      <div className="flex w-[70%] flex-col mt-12 justify-between items-center min-h-screen p-24 md:p-6">
        <h1 className="text-3xl flex items-center gap-4 font-bold mb-6">
          <FaHistory /> Quiz History
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-500">No quiz attempts found.</p>
        ) : (
          <ul className="w-full  bg-white shadow-lg rounded-lg px-14 p-4">
            {history.map((attempt, index) => (
              <li key={index} className="border-b space-y-8 py-2">
                <span className="font-semibold">Score:</span> {attempt.score} |
                <span className="ml-2 text-gray-500">{attempt.date}</span>
              </li>
            ))}
          </ul>
        )}

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            🗑 Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
