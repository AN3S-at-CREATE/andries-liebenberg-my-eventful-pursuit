import { motion, type Variants, type Transition } from "framer-motion";
import { ReactNode } from "react";

// Consistent motion timing across the site
const MOTION_CONFIG = {
  duration: 0.6, // 600ms - balanced for visibility without feeling slow
  ease: [0.25, 0.1, 0.25, 1], // easeOut cubic-bezier
  staggerDelay: 0.08,
  hoverScale: 1.02,
  hoverLift: -4,
} as const;

const createTransition = (delay: number = 0): Transition => ({
  duration: MOTION_CONFIG.duration,
  delay,
  ease: MOTION_CONFIG.ease,
});

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const directionOffsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function MotionReveal({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up" 
}: MotionRevealProps) {
  const offset = directionOffsets[direction];
  
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={createTransition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function MotionStagger({ 
  children, 
  className = "",
  staggerDelay = MOTION_CONFIG.staggerDelay 
}: MotionStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MotionItemProps {
  children: ReactNode;
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: MOTION_CONFIG.duration,
      ease: MOTION_CONFIG.ease,
    },
  },
};

export function MotionItem({ children, className = "" }: MotionItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface MotionScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionScale({ children, className = "", delay = 0 }: MotionScaleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={createTransition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// New component for interactive hover cards/buttons
interface MotionHoverProps {
  children: ReactNode;
  className?: string;
  lift?: boolean;
  scale?: boolean;
  glow?: "cyan" | "pink" | "both";
}

export function MotionHover({ 
  children, 
  className = "", 
  lift = true,
  scale = true,
  glow
}: MotionHoverProps) {
  const glowShadow = {
    cyan: "0 0 30px -5px hsl(var(--primary) / 0.5)",
    pink: "0 0 30px -5px hsl(var(--secondary) / 0.5)",
    both: "0 0 30px -5px hsl(var(--primary) / 0.4), 0 0 30px -5px hsl(var(--secondary) / 0.3)",
  };

  return (
    <motion.div
      className={className}
      whileHover={{
        y: lift ? MOTION_CONFIG.hoverLift : 0,
        scale: scale ? MOTION_CONFIG.hoverScale : 1,
        boxShadow: glow ? glowShadow[glow] : undefined,
      }}
      whileTap={{
        y: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Export config for use in other components
export const motionConfig = MOTION_CONFIG;
