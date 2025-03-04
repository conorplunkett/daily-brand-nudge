import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Settings } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

// Sample data - in a real app, this would come from an API
const sampleData = [
  {
    type: "rating",
    id: "ai_usefulness",
    question: "I feel Whoop AI is useful",
    responses: [
      { value: 1, count: 10, percentage: 10 },
      { value: 2, count: 20, percentage: 20 },
      { value: 3, count: 30, percentage: 30 },
      { value: 4, count: 25, percentage: 25 },
      { value: 5, count: 15, percentage: 15 }
    ]
  },
  {
    type: "multipleChoice",
    id: "feature_request",
    question: "Which feature would you like to see next in Whoop?",
    responses: [
      { label: "DMs between friends in Whoop", value: "dms", count: 30, percentage: 30 },
      { label: "Month end reviews", value: "reviews", count: 40, percentage: 40 },
      { label: "Hearing level monitoring", value: "hearing", count: 20, percentage: 20 },
      { label: "Nation wide competition", value: "competition", count: 10, percentage: 10 }
    ]
  },
  {
    type: "trueFalse",
    id: "discount_code",
    question: "True or False: I bought Whoop from a friend and didn't use a discount code",
    responses: [
      { value: true, count: 70, percentage: 70 },
      { value: false, count: 30, percentage: 30 }
    ]
  },
  {
    type: "multipleChoice",
    id: "hydration",
    question: "Would you be interested in Whoop offering personalized hydration recommendations?",
    responses: [
      { label: "Yes", value: "yes", count: 60, percentage: 60 },
      { label: "No", value: "no", count: 20, percentage: 20 },
      { label: "Maybe", value: "maybe", count: 20, percentage: 20 }
    ]
  },
  {
    type: "rating",
    id: "light_mode",
    question: "How badly do you want light mode in Whoop?",
    responses: [
      { value: 1, count: 5, percentage: 5 },
      { value: 2, count: 10, percentage: 10 },
      { value: 3, count: 25, percentage: 25 },
      { value: 4, count: 35, percentage: 35 },
      { value: 5, count: 25, percentage: 25 }
    ]
  }
];

const Admin = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-[var(--color-background)]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] transition-[var(--transition-base)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User size={16} />
            Participant View
          </motion.button>
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Whoop Daily Form Responses
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            {today}
          </p>
        </motion.div>

        <div className="space-y-8">
          {sampleData.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--color-background-secondary)] border border-[var(--color-border-primary)] rounded-[var(--radius-lg)] p-6"
            >
              <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-6">
                {question.question}
              </h3>
              
              <div className="flex flex-col gap-3">
                {question.responses.map((response) => (
                  <div
                    key={response.value || response.label}
                    className="flex items-center gap-4"
                  >
                    <div className="w-24 text-sm font-medium text-[var(--color-text-primary)]">
                      {question.type === "rating" ? `${response.value}` :
                       question.type === "trueFalse" ? (response.value ? "True" : "False") :
                       response.label}
                    </div>
                    <div className="flex-1 h-2 bg-[var(--color-background-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${response.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-[var(--color-whoop-primary)]"
                      />
                    </div>
                    <div className="w-16 text-sm text-[var(--color-text-secondary)] text-right">
                      {response.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin; 