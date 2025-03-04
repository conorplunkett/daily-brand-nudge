import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type EmailCaptureProps = {
  onEmailChange: (email: string) => void;
  className?: string;
};

const EmailCapture = ({ onEmailChange, className }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Only validate if there's actually input
    if (value) {
      const valid = validateEmail(value);
      setIsValid(valid);
      if (valid) {
        onEmailChange(value);
      }
    } else {
      setIsValid(true); // Reset validation if field is empty
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)]">
          Your Whoop Email
        </label>
        
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@example.com"
            className={cn(
              "w-full px-4 py-3 bg-[var(--color-background-secondary)] rounded-[var(--radius-md)] border transition-[var(--transition-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]",
              isValid 
                ? "border-[var(--color-border-secondary)] focus:border-[var(--color-whoop-light)]" 
                : "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
            )}
          />
          
          {!isValid && (
            <motion.p 
              className="absolute text-xs text-[var(--color-error)] mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Please enter a valid email address
            </motion.p>
          )}
        </div>
      </div>
      
      <p className="text-xs text-[var(--color-text-tertiary)]">
        Your responses will be linked to your Whoop account for personalized insights.
      </p>
    </div>
  );
};

export default EmailCapture;
