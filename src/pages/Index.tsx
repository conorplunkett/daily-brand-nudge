
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import QuestionCard, { QuestionType } from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import EmailCapture from "@/components/EmailCapture";
import { ArrowRight, Check } from "lucide-react";

const questions: QuestionType[] = [
  {
    type: "rating",
    id: "recovery",
    question: "How well-rested do you feel today?",
    min: 1,
    max: 5,
    minLabel: "Exhausted",
    maxLabel: "Fully Rested"
  },
  {
    type: "multipleChoice",
    id: "training",
    question: "Which factor most affected your training today?",
    options: [
      { label: "Hydration", value: "hydration" },
      { label: "Sleep", value: "sleep" },
      { label: "Stress", value: "stress" },
      { label: "Nutrition", value: "nutrition" }
    ]
  },
  {
    type: "trueFalse",
    id: "caffeine",
    question: "True or False: You consumed caffeine within 3 hours of bedtime yesterday."
  },
  {
    type: "multipleChoice",
    id: "hydration",
    question: "Would you be interested in Whoop offering personalized hydration recommendations?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Maybe", value: "maybe" }
    ]
  },
  {
    type: "rating",
    id: "insights",
    question: "Rate how useful Whoop's Strain & Recovery insights have been for your fitness progress.",
    min: 1,
    max: 5,
    minLabel: "Not Useful",
    maxLabel: "Extremely Useful"
  }
];

const Index = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  const totalQuestions = questions.length;
  const allQuestionsAnswered = Object.keys(answers).length === totalQuestions;
  
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleSubmit = () => {
    if (!isEmailValid) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    console.log("Submitted answers:", { answers, email });
    setSubmitted(true);
    toast.success("Thank you for your responses!");
    
    // In a real app, you would send the data to your backend here
  };
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailValid(true);
  };
  
  const answeredQuestionsCount = Object.keys(answers).length;
  const progressPercentage = (answeredQuestionsCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {!submitted ? (
          <>
            <div className="lg:col-span-8 w-full flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <motion.div 
                    className="h-2.5 w-2.5 rounded-full bg-whoop-500 animate-pulse-soft"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  />
                  <span className="text-sm font-medium text-whoop-800">Daily Check-in</span>
                </motion.div>
                
                <motion.h1 
                  className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Your 5 Daily Questions
                </motion.h1>
                
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Help us improve your experience with just a minute of your time.
                </motion.p>
              </div>
              
              <ProgressBar 
                currentStep={answeredQuestionsCount} 
                totalSteps={totalQuestions} 
              />
              
              <div className="flex flex-col gap-6">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <QuestionCard
                      question={question}
                      onAnswer={handleAnswer}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
                  allQuestionsAnswered
                    ? "bg-whoop-500 text-white hover:bg-whoop-600" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
              >
                Submit All Responses
                <ArrowRight size={16} />
              </motion.button>
            </div>
            
            <div className="lg:col-span-4 w-full sticky top-4">
              <motion.div 
                className="glass-panel-strong p-6 flex flex-col gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Connect Your Account
                  </h3>
                  <p className="text-sm text-gray-600">
                    Link your responses to your Whoop profile for personalized insights.
                  </p>
                </div>
                
                <EmailCapture onEmailChange={handleEmailChange} />
                
                <div className="text-xs text-gray-500 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your data is securely stored and only used to improve your Whoop experience.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Responses help us tailor recommendations to your unique needs.</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-700 font-medium">
                  Questions Completed: {answeredQuestionsCount} of {totalQuestions}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div 
            className="lg:col-span-12 glass-panel-strong p-8 flex flex-col items-center justify-center text-center gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Check size={32} className="text-green-500" />
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">Thank You for Your Responses!</h2>
              <p className="text-gray-600">Your feedback helps us improve Whoop for everyone.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-6 py-3 bg-whoop-500 text-white rounded-lg font-medium hover:bg-whoop-600 transition-all duration-300"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              Start New Questionnaire
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
