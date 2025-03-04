
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RatingQuestion, MultipleChoiceQuestion, TrueFalseQuestion } from "./QuestionTypes";
import { cn } from "@/lib/utils";

// Define Question Types
export type RatingQuestionType = {
  type: "rating";
  id: string;
  question: string;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
};

export type MultipleChoiceQuestionType = {
  type: "multipleChoice";
  id: string;
  question: string;
  options: { label: string; value: string }[];
};

export type TrueFalseQuestionType = {
  type: "trueFalse";
  id: string;
  question: string;
};

export type QuestionType = 
  | RatingQuestionType 
  | MultipleChoiceQuestionType 
  | TrueFalseQuestionType;

type QuestionCardProps = {
  question: QuestionType;
  onAnswer: (questionId: string, answer: any) => void;
  className?: string;
};

const QuestionCard = ({ question, onAnswer, className }: QuestionCardProps) => {
  const [answer, setAnswer] = useState<any>(null);
  
  const handleAnswer = (value: any) => {
    setAnswer(value);
    onAnswer(question.id, value);
  };

  // Render the appropriate question component based on type
  const renderQuestion = () => {
    switch (question.type) {
      case "rating":
        return (
          <RatingQuestion
            question={question.question}
            min={question.min}
            max={question.max}
            minLabel={question.minLabel}
            maxLabel={question.maxLabel}
            onChange={handleAnswer}
          />
        );
        
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
            question={question.question}
            options={question.options}
            onChange={handleAnswer}
          />
        );
        
      case "trueFalse":
        return (
          <TrueFalseQuestion
            question={question.question}
            onChange={handleAnswer}
          />
        );
        
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <motion.div
      className={cn(
        "glass-panel p-6 w-full",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {renderQuestion()}
    </motion.div>
  );
};

export default QuestionCard;
