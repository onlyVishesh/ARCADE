export interface Locale {
    quizQuestions: QuizQuestion[];
    quizGameQuestion: string;
    quizGameTotalScore: string;
    quizGameIncorrectQuestionsSolution: string;
    quizGameYourAnswer: string;
    quizGameCorrectAnswer: string;
    quizGamePlayAgain: string;
  }
  
  export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export type ModelProps = {
    isAnimationPlaying: boolean;
    toggleAnimation: () => void;
  } & JSX.IntrinsicElements["group"];
  