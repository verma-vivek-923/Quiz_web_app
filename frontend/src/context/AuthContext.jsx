import React, { createContext, useState } from "react";

const quizzes = [
  {
    question: "Which planet is closest to the Sun?",

    a: "Venus",
    b: "Mercury",
    c: "Earth",
    d: "Mars",
    correct: "b",
  },
  {
    question:
      "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",

    a: "Stack",
    b: "Queue",
    c: "Tree",
    d: "Graph",

    correct: "b",
  },
  {
    question:
      "Which of the following is primarily used for structuring web pages?",

    a: "Python",
    b: "Java",
    c: "HTML",
    d: "C++",

    correct: "c",
  },
  {
    question: "Which chemical symbol stands for Gold?",

    a: "Au",
    b: "Gd",
    c: "Ag",
    d: "Pt",

    correct: "a",
  },
  {
    question:
      "Which of these processes is not typically involved in refining petroleum?",

    a: "Fractional distillation",
    b: "Cracking",
    c: "Polymerization",
    d: "Filtration",

    correct: "d",
  },

  {
    question: "What is the value of 12 + 28?",

    a: "30",
    b: "40",
    c: "50",
    d: "60",

    correct: "b",
  },
  {
    question: "How many states are there in the United States?",
    a: "48",
    b: "49",
    c: "50",
    d: "51",
    correct: "c",
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    a: "1775",
    b: "1776",
    c: "1780",
    d: "1785",
    correct: "b",
  },
  {
    question: "What is the value of pi rounded to the nearest integer?",
    a: "2",
    b: "3",
    c: "4",
    d: "5",
    correct: "b",
  },
  {
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    a: "60",
    b: "100",
    c: "120",
    d: "150",
    correct: "c",
  },
];

// const quizzes = [
//     {
//         "question": "What is the scientific name of a butterfly?",
//         "a": "Apis",
//         "b": "Coleoptera",
//         "c": "Formicidae",
//         "d": "Rhopalocera",
//         "correct": "d"
//     },
//     {
//         "question": "How hot is the surface of the sun?",
//         "a": "1,233 K",
//         "b": "5,778 K",
//         "c": "12,130 K",
//         "d": "101,300 K",
//         "correct": "b"
//     },
//     {
//         "question": "Who are the actors in The Internship?",
//         "a": "Ben Stiller, Jonah Hill",
//         "b": "Courteney Cox, Matt LeBlanc",
//         "c": "Kaley Cuoco, Jim Parsons",
//         "d": "Vince Vaughn, Owen Wilson",
//         "correct": "d"
//     },
//     {
//         "question": "What is the capital of Spain?",
//         "a": "Berlin",
//         "b": "Buenos Aires",
//         "c": "Madrid",
//         "d": "San Juan",
//         "correct": "c"
//     },
//     {
//         "question": "What are the school colors of the University of Texas at Austin?",
//         "a": "Black, Red",
//         "b": "Blue, Orange",
//         "c": "White, Burnt Orange",
//         "d": "White, Old gold, Gold",
//         "correct": "c"
//     },
//     {
//         "question": "What is 70 degrees Fahrenheit in Celsius?",
//         "a": "18.8889",
//         "b": "20",
//         "c": "21.1111",
//         "d": "158",
//         "correct": "c"
//     },
//     {
//         "question": "When was Mahatma Gandhi born?",
//         "a": "October 2, 1869",
//         "b": "December 15, 1872",
//         "c": "July 18, 1918",
//         "d": "January 15, 1929",
//         "correct": "a"
//     },
//     {
//         "question": "How far is the moon from Earth?",
//         "a": "7,918 miles (12,742 km)",
//         "b": "86,881 miles (139,822 km)",
//         "c": "238,400 miles (384,400 km)",
//         "d": "35,980,000 miles (57,910,000 km)",
//         "correct": "c"
//     },
//     {
//         "question": "What is 65 times 52?",
//         "a": "117",
//         "b": "3120",
//         "c": "3380",
//         "d": "3520",
//         "correct": "c"
//     },
//     {
//         "question": "How tall is Mount Everest?",
//         "a": "6,683 ft (2,037 m)",
//         "b": "7,918 ft (2,413 m)",
//         "c": "19,341 ft (5,895 m)",
//         "d": "29,029 ft (8,847 m)",
//         "correct": "d"
//     },
//     {
//         "question": "When did The Avengers come out?",
//         "a": "May 2, 2008",
//         "b": "May 4, 2012",
//         "c": "May 3, 2013",
//         "d": "April 4, 2014",
//         "correct": "b"
//     },
//     {
//         "question": "What is 48,879 in hexidecimal?",
//         "a": "0x18C1",
//         "b": "0xBEEF",
//         "c": "0xDEAD",
//         "d": "0x12D591",
//         "correct": "b"
//     }
// ]

export const Auth = createContext(null); // Ensure the default value is null

export const AuthProvider = (props) => {
  // Change name to `AuthProvider`
  const [start, setStart] = useState(false);
  const [exit, setExit] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [ansCorrect, setAnsCorrect] = useState(0);

  return (
    <Auth.Provider
      value={{
        start,
        exit,
        setStart,
        setExit,
        ansCorrect,
        setAnsCorrect,
        quizzes,
        correct,
        setCorrect,
      }}
    >
      {props.children}
    </Auth.Provider>
  );
};
