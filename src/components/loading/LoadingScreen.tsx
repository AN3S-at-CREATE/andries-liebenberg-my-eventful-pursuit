import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import loadingGif from "@/assets/loading-screen.gif";
import logo from "@/assets/logo.svg";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LOADING_MESSAGES = [
  "Initializing systems...",
  "Syncing event intelligence...",
  "Preparing interactive experience...",
];

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [mediaFailed, setMediaFailed] = useState(false);

  useEffect(() => {
    if (!isLoading || shouldReduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveMessageIndex((currentIndex) => (currentIndex + 1) % LOADING_MESSAGES.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, [isLoading, shouldReduceMotion]);

  const statusMessage = useMemo(() => {
    if (shouldReduceMotion) {
      return "Loading...";
    }

    return LOADING_MESSAGES[activeMessageIndex];
  }, [activeMessageIndex, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          aria-live="polite"
          aria-busy={true}
          role="status"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-secondary/20 blur-[100px]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1.2, 1, 1.2],
                      opacity: [0.4, 0.2, 0.4],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--secondary) / 0.3) 50%, transparent 70%)",
                }}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.1, 1],
                      }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {mediaFailed ? (
                <>
                {/* 🚀 Optimizer: Added fetchPriority="high" for critical loading fallback logo to protect LCP */}
                <img
                  src={logo}
                  alt="AN3S logo"
                  className="relative z-10 h-56 w-56 object-contain"
                  fetchPriority="high"
                  decoding="sync"
                  width="224"
                  height="224"
                />
                </>
              ) : (
                <>
                {/* 🚀 Optimizer: Added fetchPriority="high" for critical loading animation to protect LCP */}
                <img
                  src={loadingGif}
                  alt="Loading animation"
                  className="relative z-10 h-56 w-56 object-contain"
                  fetchPriority="high"
                  decoding="sync"
                  onError={() => setMediaFailed(true)}
                  width="224"
                  height="224"
                />
                </>
              )}
            </motion.div>

            <div className="h-1 w-56 overflow-hidden rounded-full bg-muted/30">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: "15%" }}
                animate={{
                  width: ["15%", "65%", "100%"],
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  width: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              />
            </div>

            <motion.p
              className="text-sm text-muted-foreground"
              key={statusMessage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {statusMessage}
            </motion.p>
          </div>

          <motion.div
            className="absolute right-0 bottom-0 left-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), transparent)",
            }}
            animate={shouldReduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
