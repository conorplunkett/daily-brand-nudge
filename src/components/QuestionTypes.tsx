
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Rating Question Type
type RatingQuestionProps = {
  question: string;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
};

export const RatingQuestion = ({
  question,
  min,
  max,
  minLabel = "",
  maxLabel = "",
  onChange
}: RatingQuestionProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelectedRating(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-medium text-gray-800">{question}</h3>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4 mb-1">
          {minLabel && <span className="text-sm text-gray-500">{minLabel}</span>}
          {maxLabel && <span className="text-sm text-gray-500">{maxLabel}</span>}
        </div>
        
        <div className="flex justify-between gap-3">
          {Array.from({ length: max - min + 1 }).map((_, index) => {
            const value = min + index;
            const isSelected = selectedRating === value;
            
            return (
              <motion.button
                key={value}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium transition-all duration-300",
                  isSelected 
                    ? "border-whoop-500 bg-whoop-500 text-white" 
                    : "border-gray-200 bg-white text-gray-700 hover:border-whoop-300 hover:bg-whoop-50"
                )}
                onClick={() => handleSelect(value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Multiple Choice Question Type
type Option = {
  label: string;
  value: string;
};

type MultipleChoiceQuestionProps = {
  question: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const MultipleChoiceQuestion = ({
  question,
  options,
  onChange
}: MultipleChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-medium text-gray-800">{question}</h3>
      
      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === option.value;
          const letter = letters[index % letters.length];
          
          return (
            <motion.button
              key={option.value}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg border text-left transition-all duration-300",
                isSelected 
                  ? "border-whoop-500 bg-whoop-50" 
                  : "border-gray-200 bg-white hover:border-whoop-200 hover:bg-gray-50"
              )}
              onClick={() => handleSelect(option.value)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium",
                isSelected 
                  ? "bg-whoop-500 text-white" 
                  : "bg-gray-100 text-gray-600"
              )}>
                {letter}
              </div>
              <span className={cn(
                "font-medium",
                isSelected ? "text-whoop-800" : "text-gray-700"
              )}>
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// True/False Question Type
type TrueFalseQuestionProps = {
  question: string;
  onChange: (value: boolean) => void;
};

export const TrueFalseQuestion = ({
  question,
  onChange
}: TrueFalseQuestionProps) => {
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null);

  const handleSelect = (value: boolean) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-medium text-gray-800">{question}</h3>
      
      <div className="flex gap-4">
        <motion.button
          className={cn(
            "flex-1 py-4 px-6 rounded-lg border font-medium transition-all duration-300",
            selectedValue === true
              ? "border-whoop-500 bg-whoop-500 text-white" 
              : "border-gray-200 bg-white text-gray-700 hover:border-whoop-300 hover:bg-whoop-50"
          )}
          onClick={() => handleSelect(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          True
        </motion.button>
        
        <motion.button
          className={cn(
            "flex-1 py-4 px-6 rounded-lg border font-medium transition-all duration-300",
            selectedValue === false
              ? "border-whoop-500 bg-whoop-500 text-white" 
              : "border-gray-200 bg-white text-gray-700 hover:border-whoop-300 hover:bg-whoop-50"
          )}
          onClick={() => handleSelect(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          False
        </motion.button>
      </div>
    </div>
  );
};
