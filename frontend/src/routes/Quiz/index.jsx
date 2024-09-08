import 'aframe';
import React, { useState } from 'react';
import { Box, Text, Scene, Sky, Camera, Cursor, Plane } from 'react-aframe-ar';

const Quiz = () => {
  const topics = ['Cube', 'Sphere', 'Cylinder', 'Torus'];
  const questionsByTopic = {
    Cube: [
      { question: 'Does a cube have six faces?', answer: 'yes' },
      { question: 'Can a cube roll like a ball?', answer: 'no' },
      { question: 'Are all the faces of a cube square?', answer: 'yes' },
      { question: 'Does a cube have edges of equal length?', answer: 'yes' },
      { question: 'Is a cube a type of prism?', answer: 'yes' }
    ],
    Sphere: [
      { question: 'Is a sphere a 3D shape?', answer: 'yes' },
      { question: 'Does a sphere have flat surfaces?', answer: 'no' },
      { question: 'Can a sphere roll in any direction?', answer: 'yes' },
      { question: 'Does a sphere have edges?', answer: 'no' },
      { question: 'Is the Earth shaped like a sphere?', answer: 'yes' }
    ],
    Cylinder: [
      { question: 'Does a cylinder have two circular faces?', answer: 'yes' },
      { question: 'Is a cylinder a 3D shape?', answer: 'yes' },
      { question: 'Does a cylinder have any flat surfaces?', answer: 'no' },
      { question: 'Can a cylinder roll?', answer: 'yes' },
      { question: 'Is a cylinder shaped like a can?', answer: 'yes' }
    ],
    Torus: [
      { question: 'Is a torus shaped like a doughnut?', answer: 'yes' },
      { question: 'Does a torus have flat sides?', answer: 'no' },
      { question: 'Can a torus be created by rotating a circle around an axis?', answer: 'yes' },
      { question: 'Does a torus have a hole in the middle?', answer: 'yes' },
      { question: 'Is a torus a type of surface of revolution?', answer: 'yes' }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showTopicSelection, setShowTopicSelection] = useState(false);

  const handleClick = (type) => {
    const isCorrect = type === questions[currentQuestion].answer;

    if (isCorrect) {
      setFeedback('Correct!');
      setScore(score + 1);
    } else {
      setFeedback('Wrong!');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback('');
      } else {
        setIsQuizFinished(true);
      }
    }, 1000);
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
    setQuestions(questionsByTopic[topic]);
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizFinished(false);
  };

  const showTopics = () => {
    setShowTopicSelection(true);
  };

  const restartQuiz = () => {
    setIsQuizStarted(false);
    setShowTopicSelection(true);
    setSelectedTopic('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <Scene>
      {!showTopicSelection ? (
        <>
          {/* Start a Quiz Button */}
          <Box
            position="0 1.5 -3"
            color="#4CC3D9"
            scale="1.2 0.6 0.1"
            events={{
              click: showTopics,
              mouseenter: (e) => (e.target.setAttribute('scale', '1.3 0.7 0.2')),
              mouseleave: (e) => (e.target.setAttribute('scale', '1.2 0.6 0.1'))
            }}
            class="clickable"
          />
          <Text
            value="Start a Quiz"
            position="0 1.6 -2.6"
            align="center"
            color="#ffffff"
          />
        </>
      ) : !isQuizStarted ? (
        <>
          {/* Topic Selection */}
          <Text
            value="Select a Topic"
            position="0 2 -3"
            align="center"
            color="#ffffff"
          />
          {topics.map((topic, index) => (
            <React.Fragment key={index}>
              <Box
                position={`${-1.5 + index * 1.5} 3 -3`}
                color={selectedTopic === topic ? '#00FF00' : '#008c00'}
                scale="0.8 0.6 0.1"
                events={{
                  click: () => handleTopicSelection(topic),
                  mouseenter: (e) => (e.target.setAttribute('scale', '0.9 0.7 0.2')),
                  mouseleave: (e) => (e.target.setAttribute('scale', '0.8 0.6 0.1'))
                }}
                class="clickable"
              />
              <Text
                value={topic}
                position={`${-1.5 + index * 1.5} 3.5 -3`}
                align="center"
                color="#ffffff"
              />
            </React.Fragment>
          ))}

          {/* Start Button */}
          {selectedTopic && (
            <>
              <Box
                position="0 0.5 -3"
                color="#4CC3D9"
                scale="1 0.6 0.1"
                events={{
                  click: startQuiz,
                  mouseenter: (e) => (e.target.setAttribute('scale', '1.1 0.7 0.2')),
                  mouseleave: (e) => (e.target.setAttribute('scale', '1 0.6 0.1'))
                }}
                class="clickable"
              />
              <Text
                value="START"
                position="0 0.6 -2.6"
                align="center"
                color="#ffffff"
              />
            </>
          )}
        </>
      ) : !isQuizFinished ? (
        <>
          {/* Yes Button */}
          <Box
            position="-1 1.5 -3"
            color="#008c00"
            scale="0.5 0.4 0.1"
            events={{
              click: () => handleClick('yes'),
              mouseenter: (e) => (e.target.setAttribute('scale', '0.6 0.6 0.6')),
              mouseleave: (e) => (e.target.setAttribute('scale', '0.5 0.5 0.5'))
            }}
            class="clickable"
          />
          {/* Yes Text */}
          <Text
            value="Yes"
            position="-1 1.5 -2.6"
            align="center"
            color="#ffffff"
          />

          {/* No Button */}
          <Box
            position="1 1.5 -3"
            color="#EF2D5E"
            scale="0.5 0.4 0.1"
            events={{
              click: () => handleClick('no'),
              mouseenter: (e) => (e.target.setAttribute('scale', '0.6 0.6 0.6')),
              mouseleave: (e) => (e.target.setAttribute('scale', '0.5 0.5 0.5'))
            }}
            class="clickable"
          />
          {/* No Text */}
          <Text
            value="No"
            position="1 1.5 -2.6"
            align="center"
            color="#ffffff"
          />

          {/* Question Text */}
          <Text
            value={questions[currentQuestion]?.question || ''}
            position="0 2 -3"
            align="center"
          />

          {/* Feedback Text */}
          {feedback && (
            <Text
              value={feedback}
              position="0 0.5 -3"
              align="center"
              color={feedback === 'Correct!' ? '#4CC3D9' : '#EF2D5E'}
            />
          )}
        </>
      ) : (
        <>
          <Text
            value={`Quiz Finished! Your Score: ${score} / ${questions.length}`}
            position="0 2 -3"
            align="center"
            color="#000000"
          />

          {/* Restart Button */}
          <Box
            position="0 0.5 -3"
            color="#FFCC00"
            scale="1 0.6 0.1"
            events={{
              click: restartQuiz,
              mouseenter: (e) => (e.target.setAttribute('scale', '1.1 0.7 0.2')),
              mouseleave: (e) => (e.target.setAttribute('scale', '1 0.6 0.1'))
            }}
            class="clickable"
          />
          <Text
            value="Restart"
            position="0 0.6 -2.6"
            align="center"
            color="#ffffff"
          />
        </>
      )}

      {/* Camera */}
      <Camera>
        <Cursor raycaster="objects: .clickable" />
      </Camera>

      <Sky
        color="#00bbe0"
      />
      <Plane position="0 0 -4" rotation="-90 0 0" width="10" height="200" color="#404040" shadow />


      {/* <a-image
        // src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/ColinStapczynski/phpIiYR5R.png"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK28E8Z4mWXqNCNBZQd-IJ4XSL0d_KM3sZyg&s"
        position="0 3 -5"
        width="1.5"
        height="1"
      /> */}
    </Scene>
  );
};

export default Quiz;
3