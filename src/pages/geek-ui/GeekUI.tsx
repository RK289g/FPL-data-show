import { Button, Col, Progress, Radio, Row } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./GeekUI.css";

// TypeScript Interfaces
interface Question {
  question: string;
  options: string[];
}

interface QuizData {
  _id: string;
  topic: string;
  questions: Question[];
  createdBy: string;
  createdAt: string;
}

interface SubmissionData {
  quizId: string;
  userId: string;
  answers: number[];
}

// Mock Quiz Data
const quizData: QuizData = {
  _id: "quiz_id_456",
  topic: "General Knowledge",
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"],
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
    },
    {
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Au", "Ag", "Fe"],
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
    },
    {
      question: "Which scientist developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Nikola Tesla",
      ],
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
    },
  ],
  createdBy: "admin_id_789",
  createdAt: "2025-03-19T12:30:00Z",
};

const GeekUI = () => {
  const totalQuestions = quizData.questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleOptionSelect = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = index; // Store selected answer
    setSelectedAnswers(newAnswers);

    // Update progress
    const completed = newAnswers.filter((ans) => ans !== undefined).length;
    setProgress((completed / totalQuestions) * 100);

    // Move to next question if available
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 500);
    }
  };

  return (
    <div className="quiz-page-wrapper">
      <Row>
        <Col span={16}>
          <div className="quiz-title-wrapper">
            <p className="quiz-title">{quizData.topic}</p>
            <p className="quiz-subtitle">
              Test your knowledge on {quizData.topic}!
            </p>
          </div>
          <div className="ques-time-wrapper">
            <div className="ques-time-inner-wrapper">
              <div className="quiz-index-wrapper">
                <p className="quiz-index">
                  {currentQuestionIndex + 1} of {totalQuestions}
                </p>
                <p className="quiz-index-title">Biology Quiz</p>
              </div>
              <div className="end-quiz-button-wrapper">
                <Button danger shape="round" className="end-quiz-button">
                  End Quiz
                </Button>
              </div>
            </div>
            <div className="progress-bar-time-wrapper">
              <div className="progress-bar-wrapper">
                <Progress
                  strokeColor="#433D3D"
                  size={{ height: 12 }}
                  percent={progress}
                  showInfo={false}
                  className="progress-bar"
                />
              </div>
              <div className="respond-time-wrapper">
                <div className="respond-clock-wrapper">
                  <ClockCircleOutlined />
                  <p>Respond within time</p>
                </div>
                <p>
                  <span className="time-span">02:20</span>/05:00 min
                </p>
              </div>
            </div>
            <div className="quiz-wrapper">
              <div className="quiz-inner-wrapper">
                <div className="ques-title-wrapper">
                  <p className="ques-index">{currentQuestionIndex + 1}</p>
                  <p className="ques-title">
                    {quizData.questions[currentQuestionIndex].question}
                  </p>
                </div>
                <div className="options-wrapper">
                  <Row>
                    {quizData.questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <Col span={12} key={index}>
                          <Radio
                            className="options"
                            checked={
                              selectedAnswers[currentQuestionIndex] === index
                            }
                            onClick={() => handleOptionSelect(index)}
                          >
                            {String.fromCharCode(65 + index)}. {option}
                          </Radio>
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GeekUI;
