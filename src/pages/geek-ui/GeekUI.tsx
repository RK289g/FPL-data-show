import { useState, useEffect } from "react";
import { Button, Col, Progress, Radio, Row } from "antd";
import "./GeekUI.css";
import { ClockCircleOutlined } from "@ant-design/icons";

const quizData = {
  _id: "quiz_id_456",
  topic: "Myth or Fact? Debunking Common Misconceptions",
  questions: [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    },
  ],
  duration: 3,
};

const GeekUI = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(quizData.duration * 60);
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isStarted]);

  const handleOptionSelect = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[qIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
    setTimeLeft(quizData.duration * 60);
  };

  const handleSubmit = () => {
    console.log("User Answers:", selectedAnswers);
    alert("Quiz submitted!");
  };

  return (
    <div className="quiz-page-wrapper">
      <Row>
        <Col span={16}>
          <div className="quiz-title-wrapper">
            <p className="quiz-title">{quizData.topic}</p>
            <p className="quiz-subtitle">Test your skills—how now?</p>
          </div>

          {!isStarted ? (
            <div className="start-button-wrapper">
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={handleStartQuiz}
                style={{ color: "#ffffff", backgroundColor: "#FF5500" }}
              >
                Start Quiz
              </Button>
            </div>
          ) : (
            <>
              <div className="ques-time-wrapper">
                <div className="ques-time-inner-wrapper">
                  <div className="quiz-index-wrapper">
                    <p className="quiz-index">
                      {
                        selectedAnswers.filter((ans) => ans !== undefined)
                          .length
                      }{" "}
                      to {quizData.questions.length}
                    </p>

                    <p className="quiz-index-title">Interview Question</p>
                  </div>
                  <div className="end-quiz-button-wrapper">
                    <Button
                      danger
                      shape="round"
                      className="end-quiz-button"
                      onClick={handleSubmit}
                    >
                      End Quiz
                    </Button>
                  </div>
                </div>

                <div className="progress-bar-time-wrapper">
                  <div className="progress-bar-wrapper">
                    <Progress
                      strokeColor="#433D3D"
                      size={{ height: 12 }}
                      percent={Math.min(
                        100,
                        (timeLeft / (quizData.duration * 60)) * 100
                      )}
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
                      <span className="time-span">
                        {`${String(Math.floor(timeLeft / 60)).padStart(
                          2,
                          "0"
                        )}:${String(timeLeft % 60).padStart(2, "0")}`}
                      </span>
                      / {`${String(quizData.duration).padStart(2, "0")}:00 min`}
                    </p>
                  </div>
                </div>

                {quizData.questions.map((q, qIndex) => (
                  <div className="quiz-wrapper" key={qIndex}>
                    <div className="quiz-inner-wrapper">
                      <div className="ques-title-wrapper">
                        <p className="ques-index">{qIndex + 1}</p>
                        <p className="ques-title">{q.question}</p>
                      </div>

                      <div className="options-wrapper">
                        <Row>
                          {q.options.map((option, optionIndex) => (
                            <Col span={12} key={optionIndex}>
                              <Radio
                                className="options"
                                checked={
                                  selectedAnswers[qIndex] === optionIndex
                                }
                                onClick={() =>
                                  handleOptionSelect(qIndex, optionIndex)
                                }
                              >
                                {String.fromCharCode(65 + optionIndex)}.{" "}
                                {option}
                              </Radio>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="submit-button-wrapper">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={handleSubmit}
                    style={{ color: "#ffffff", backgroundColor: "#FF5500" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default GeekUI;
