import React from "react";

const QueCard = ({ question, handleAnswer }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          className="block p-2 mt-2 w-full border rounded hover:bg-gray-200"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QueCard;
