import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

const ProgressBar = ({ 
  currentStep, 
  totalSteps, 
  className 
}: ProgressBarProps) => {
  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn("w-full h-1.5 bg-[var(--color-background-tertiary)] rounded-[var(--radius-full)] overflow-hidden", className)}>
      <motion.div
        className="h-full bg-[var(--color-whoop-primary)] rounded-[var(--radius-full)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default ProgressBar;
