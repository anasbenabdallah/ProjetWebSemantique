import { useState } from "react";
import { Modal, Typography, Button, Divider, Alert } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function Questionpopup({ open, handleClose, questions }) {
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  const fetchAnswer = (index) => {
    // Mock data fetching function
    const mockAnswers = [
      "Paris",
      "Gold's chemical symbol AU is derived from the Latin word aurum, meaning gold",
      "Albert",
      "44",
    ];
    if (currentQuestionIndex === index) {
      // If the same button is clicked, toggle the answer off
      setCurrentAnswer(null);
      setCurrentQuestionIndex(null);
    } else {
      setCurrentAnswer(mockAnswers[index % mockAnswers.length]);
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <Modal
      visible={open}
      onCancel={handleClose}
      width="80%"
      footer={[
        <Button key="close" onClick={handleClose}>
          Close
        </Button>,
      ]}
      title={
        <div
          style={{
            backgroundColor: "darkblue",
            padding: "10px",
            color: "white",
          }}
        >
          Questions
        </div>
      }
    >
      {questions.map((q, index) => (
        <div key={index}>
          <Title level={4}>Enonce:</Title>
          <Text>{q.enonceQuestion}</Text>
          <Title level={4} style={{ marginTop: "16px" }}>
            Question:
          </Title>
          <Text>{q.texteQuestion}</Text>
          <Button
            type="link"
            onClick={() => fetchAnswer(index)}
            style={{ display: "block", margin: "8px 0" }}
          >
            See Answer
          </Button>
          {currentAnswer && (
            <Alert
              message={currentAnswer}
              type="info"
              showIcon
              style={{ marginBottom: "16px" }}
            />
          )}
          {index !== questions.length - 1 && (
            <Divider
              style={{
                margin: "16px 0",
                backgroundColor: "green",
              }}
            />
          )}
        </div>
      ))}
    </Modal>
  );
}

Questionpopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      texteQuestion: PropTypes.string.isRequired,
      enonceQuestion: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Questionpopup;
