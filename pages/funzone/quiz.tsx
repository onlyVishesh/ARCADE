import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import de from "../../locales/de/translationDe.json";
import en from "../../locales/en/translationEn.json";
import fr from "../../locales/fr/translationFr.json";
import hi from "../../locales/hi/translationHi.json";
import ja from "../../locales/ja/translationJa.json";
import ru from "../../locales/ru/translationRu.json";

const locales = { en, de, fr, hi, ja, ru };

const QuizGame = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale ? locales[locale] : locales["en"];
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const shuffleOptions = (options) => {
    return options.slice().sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongAnswers((prevWrongAnswers) => [
        ...prevWrongAnswers,
        {
          questionIndex: currentQuestionIndex,
          optionIndex: currentQuestion.options.findIndex(
            (option) => option === selectedOption
          ),
        },
      ]);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowDetails(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setShowDetails(false);
    generateQuiz();
  };

  const generateQuiz = () => {
    // Randomly select indices to get questions
    const shuffledIndices = Array.from(
      { length: t.quizQuestions.length },
      (_, index) => index
    );
    const selectedIndices = shuffledIndices.slice(0, 5);

    // Use selected indices to get questions and shuffle options
    const selectedQuestions = selectedIndices.map((index) => {
      const question = t.quizQuestions[index];
      return {
        ...question,
        options: shuffleOptions(question.options),
      };
    });

    setQuizData(selectedQuestions);
  };

  useEffect(() => {
    generateQuiz();
  }, [locale]);

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {currentQuestion && !showDetails && (
        <div>
          <h2 className="flex justify-center text-white text-xl md:text-2xl py-2">
            {t.quizGameQuestion} {currentQuestionIndex + 1}/{quizData.length}:
          </h2>
          <p className="flex justify-center text-white text-lg py-2">
            {currentQuestion.question}
          </p>
          <div className="flex flex-col items-center">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="w-56 p-2 mt-2 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm bg-red-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {showDetails && (
        <div>
          <p className="flex justify-center text-white text-xl md:text-2xl py-4">
            {t.quizGameTotalScore}: {score}/{quizData.length}
          </p>
          <div>
            <p className="text-white text-l md:text-2xl py-2">
              <strong>{t.quizGameIncorrectQuestionsSolution}</strong>
            </p>
            {wrongAnswers.map((wrongAnswer, index) => (
              <div key={index} className="text-white py-2 w-full">
                <p>
                  <strong>{t.quizGameQuestion}:</strong>{" "}
                  {t.quizQuestions[wrongAnswer.questionIndex].question}
                </p>
                <p>
                  <strong>{t.quizGameYourAnswer}:</strong>{" "}
                  {
                    t.quizQuestions[wrongAnswer.questionIndex].options[
                      wrongAnswer.optionIndex
                    ]
                  }
                </p>
                <p>
                  <strong>{t.quizGameCorrectAnswer}:</strong>{" "}
                  {t.quizQuestions[wrongAnswer.questionIndex].correctAnswer}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="w-56 p-2 mt-4 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm bg-red-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg"
              onClick={resetQuiz}
            >
              {t.quizGamePlayAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
