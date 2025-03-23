import { useState } from "react";
import { Button, Col, Radio, Divider, Input, Row, message } from "antd";
import "./QuizUI.css";

const QuizUI: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  // Handle input changes
  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, value: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const handleSubmit = async () => {
    if (
      !quizTitle ||
      !duration ||
      questions.some((q) => !q.question || q.options.some((o) => !o))
    ) {
      message.error("Please fill in all fields.");
      return;
    }

    const quizData = {
      topic: quizTitle,
      questions,
      duration,
      author_name: "67db0e6f7b60ebebd25664d7",
    };

    console.log("Submitting Quiz:", quizData);

    try {
      const response = await fetch("https://your-api.com/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) throw new Error("Failed to create quiz");

      message.success("Quiz created successfully!");
      setQuizTitle("");
      setDuration(null);
      setQuestions([
        { question: "", options: ["", "", "", ""], correctAnswer: 0 },
      ]);
    } catch (error) {
      message.error("Error creating quiz.");
    }
  };

  return (
    <div className="quiz-ui-wrapper">
      <div className="quiz-ui-inner-wrapper">
        <div className="quiz-header">
          <p className="quiz-header-title">Create Quiz</p>
          <p className="quiz-heeader-subtitle">
            Create quizzes, challenge others, and share your knowledge!
          </p>
        </div>

        <div className="quiz-input-wrapper">
          <div className="quiz-input-inner-wrapper">
            <div className="ques-header-wrapper">
              <p className="ques-index">Enter the Details</p>
              <p className="ques-time-label">
                Question time:{" "}
                <Input
                  type="number"
                  placeholder="Enter time"
                  style={{ width: "100px" }}
                  value={duration || ""}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />{" "}
                min
              </p>
            </div>

            <Divider />

            <div className="quiz-title-wrapper">
              <p className="quiz-title-label">Quiz Title</p>
              <Input
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>

            {questions.map((q, qIndex) => (
              <div className="ques-wrapper" key={qIndex}>
                <div className="ques-title-wrapper">
                  <p className="ques-title-label">Question {qIndex + 1}</p>
                  <Input
                    placeholder="Enter question title"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                  />
                </div>

                <div className="ques-options-wrapper">
                  <Row gutter={[16, 0]}>
                    {q.options.map((option, oIndex) => (
                      <Col span={12} key={oIndex}>
                        <div className="ques-option-wrapper">
                          <p className="ques-option-label">
                            Option {String.fromCharCode(65 + oIndex)}
                          </p>
                          <Input
                            placeholder="Enter option"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <div className="correct-answer-wrapper">
                  <p className="correct-answer-label">Correct Answer</p>
                  <div className="correct-answer-option-wrapper">
                    <Radio.Group
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleCorrectAnswerChange(qIndex, e.target.value)
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {q.options.map((_, oIndex) => (
                        <Radio key={oIndex} value={oIndex}>
                          Option {String.fromCharCode(65 + oIndex)}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              </div>
            ))}

            <div className="submit-button-wrapper">
              <Button
                type="default"
                shape="round"
                className="submit-button"
                style={{ color: "#FF5500", borderColor: "#FF5500" }}
                onClick={handleSubmit}
              >
                Save Quiz
              </Button>
              <Button
                type="primary"
                shape="round"
                className="submit-button"
                style={{ color: "white", backgroundColor: "#FF5500" }}
                onClick={addQuestion}
              >
                Add Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizUI;
