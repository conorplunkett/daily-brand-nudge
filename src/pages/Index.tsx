import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import QuestionCard, { QuestionType } from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import EmailCapture from "@/components/EmailCapture";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Check, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const questions: QuestionType[] = [
  {
    type: "rating",
    id: "ai_usefulness",
    question: "I feel Whoop AI is useful",
    min: 1,
    max: 5,
    minLabel: "Not Useful",
    maxLabel: "Extremely Useful"
  },
  {
    type: "multipleChoice",
    id: "feature_request",
    question: "Which feature would you like to see next in Whoop?",
    options: [
      { label: "DMs between friends in Whoop", value: "dms" },
      { label: "Month end reviews", value: "reviews" },
      { label: "Hearing level monitoring", value: "hearing" },
      { label: "Nation wide competition", value: "competition" }
    ]
  },
  {
    type: "trueFalse",
    id: "discount_code",
    question: "True or False: I bought Whoop from a friend and didn't use a discount code"
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
    id: "light_mode",
    question: "How badly do you want light mode in Whoop?",
    min: 1,
    max: 5,
    minLabel: "Not Important",
    maxLabel: "Desperately Need It"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[var(--color-background)]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] transition-[var(--transition-base)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings size={16} />
            Admin View
          </motion.button>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                      className="h-2.5 w-2.5 rounded-full bg-[var(--color-whoop-primary)] animate-pulse-soft"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">Daily Check-in</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    Your 5 Daily Questions
                  </motion.h1>
                  
                  <motion.p 
                    className="text-[var(--color-text-secondary)]"
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

                <motion.p 
                  className="text-sm text-[var(--color-text-secondary)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </motion.p>
                
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
                    "px-6 py-3 rounded-[var(--radius-md)] font-medium transition-[var(--transition-base)] flex items-center justify-center gap-2",
                    allQuestionsAnswered
                      ? "bg-[var(--color-whoop-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-whoop-hover)]" 
                      : "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] cursor-not-allowed"
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
                  className="bg-[var(--color-background-tertiary)] backdrop-blur-lg border border-[var(--color-border-primary)] p-6 flex flex-col gap-6 rounded-[var(--radius-lg)]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div>
                    <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
                      Connect Your Account
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Link your responses to your Whoop profile for personalized insights.
                    </p>
                  </div>
                  
                  <EmailCapture onEmailChange={handleEmailChange} />
                  
                  <div className="text-xs text-[var(--color-text-tertiary)] flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span>Your data is securely stored and only used to improve your Whoop experience.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span>Responses help us tailor recommendations to your unique needs.</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-[var(--color-text-secondary)] font-medium">
                    Questions Completed: {answeredQuestionsCount} of {totalQuestions}
                  </div>
                </motion.div>
              </div>
            </>
          ) : (
            <motion.div 
              className="lg:col-span-12 bg-[var(--color-background-tertiary)] backdrop-blur-lg border border-[var(--color-border-primary)] p-8 flex flex-col items-center justify-center text-center gap-6 rounded-[var(--radius-lg)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Check size={32} className="text-[var(--color-success)]" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Thank You for Your Responses!</h2>
                <p className="text-[var(--color-text-secondary)]">Your feedback helps us improve Whoop for everyone.</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-3 bg-[var(--color-whoop-primary)] text-[var(--color-text-primary)] rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-whoop-hover)] transition-[var(--transition-base)]"
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
    </div>
  );
};

export default Index;
