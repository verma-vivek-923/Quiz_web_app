import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Auth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = ({ startQuiz }) => {
  const { setStart, setCorrect } = useContext(Auth);
  const navigateTo = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-blue-100 text-center">
      {/* Animated Welcome Text */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <motion.h1
          className="text-4xl font-bold text-blue-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to
        </motion.h1>
        <motion.h1
          className="text-4xl font-bold text-red-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          QuizTime
        </motion.h1>
      </div>

      {/* Tagline Animation */}
      <motion.p
        className="text-xl text-gray-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Test Your Knowledge, Beat the Clock!
      </motion.p>

      {/* Start Button */}
      <motion.button
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-xl font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => {
          navigateTo("/quiz");
          setCorrect(0);
          setStart(true);
        }}
        whileHover={{ scale: 1.1 }}
      >
        Start Quiz
      </motion.button>

      {/* Quiz Rules */}
      <motion.div
        className="mt-6 w-[80%] bg-blue-50 shadow-lg p-5 rounded-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
           Quiz Rules:
        </h2>
        <ul className="text-lg text-gray-700 text-left space-y-2">
          <li>
            <strong>Total Questions:</strong> 10
          </li>
          <li>
            <strong>Time per Question:</strong> 30 seconds
          </li>
          <li>
            <strong>Points per Correct Answer:</strong> +10
          </li>
          <li>
            <strong>Negative Points for Wrong Answer:</strong> -2
          </li>
        </ul>
      </motion.div>
      <button
        onClick={() => navigateTo("/history")}
        className="px-6  py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        View History
      </button>
    </div>
  );
};

export default Home;
