import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      {/* Animated background glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo/Brand mark with glow */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
              filter: "blur(20px)",
              opacity: 0.6,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Brand text */}
          <div className="relative z-10 w-32 h-32 rounded-full bg-background flex items-center justify-center border border-foreground/10">
            <motion.span
              className="font-heading text-4xl font-bold text-primary glow-text-cyan"
              animate={{
                textShadow: [
                  "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.5)",
                  "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              AN3S
            </motion.span>
          </div>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
              backgroundSize: "200% 100%",
            }}
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              width: { duration: 1.5, ease: "easeInOut" },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Initializing...
          </motion.span>
        </motion.p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), transparent)",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
