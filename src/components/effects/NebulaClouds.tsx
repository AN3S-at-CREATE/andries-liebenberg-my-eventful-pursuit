import { motion } from "framer-motion";

export function NebulaClouds() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-15 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary cyan nebula - top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary pink nebula - bottom right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--secondary)) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -40, -10, 0],
          y: [0, -50, 20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Smaller cyan accent - center right */}
      <motion.div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, -30, 10, 0],
          y: [0, 40, -30, 0],
          rotate: [0, 10, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Small pink accent - left side */}
      <motion.div
        className="absolute top-2/3 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--secondary)) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 60, 20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Mixed gradient nebula - center top */}
      <motion.div
        className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 50, 20, 0],
          rotate: [0, -15, 10, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 12,
        }}
      />

      {/* Subtle bottom gradient overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[500px] opacity-[0.03]"
        style={{
          background: "linear-gradient(to top, hsl(var(--secondary)), transparent)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
