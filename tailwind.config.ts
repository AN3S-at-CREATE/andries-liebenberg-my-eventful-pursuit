import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
// The AN3S design system is the only source of truth for colours, fonts, radii, glows and
// gradients. They all arrive through this generated preset (src/design-system/README.md);
// don't add colors, fontFamily, borderRadius or fontSize here.
import an3s from "./src/design-system/tailwind-preset.js";

export default {
  presets: [an3s],
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Motion only. Glows use the design system's saturated hues: primary = pink, secondary = cyan.
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--pink-hsl) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--pink-hsl) / 0.5)" },
        },
        "glow-pulse-secondary": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--cyan-hsl) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--cyan-hsl) / 0.5)" },
        },
        "border-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--pink-hsl) / 0.4), 0 0 20px hsl(var(--pink-hsl) / 0.2), 0 0 35px hsl(var(--pink-hsl) / 0.1), inset 0 0 10px hsl(var(--pink-hsl) / 0.1)",
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--pink-hsl) / 0.6), 0 0 30px hsl(var(--pink-hsl) / 0.4), 0 0 50px hsl(var(--pink-hsl) / 0.2), inset 0 0 15px hsl(var(--pink-hsl) / 0.15)",
          },
        },
        "border-glow-secondary": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--cyan-hsl) / 0.4), 0 0 20px hsl(var(--cyan-hsl) / 0.2), 0 0 35px hsl(var(--cyan-hsl) / 0.1), inset 0 0 10px hsl(var(--cyan-hsl) / 0.1)",
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--cyan-hsl) / 0.6), 0 0 30px hsl(var(--cyan-hsl) / 0.4), 0 0 50px hsl(var(--cyan-hsl) / 0.2), inset 0 0 15px hsl(var(--cyan-hsl) / 0.15)",
          },
        },
        "border-glow-dual": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--pink-hsl) / 0.4), 0 0 20px hsl(var(--pink-hsl) / 0.2), 0 0 35px hsl(var(--cyan-hsl) / 0.1)",
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--cyan-hsl) / 0.5), 0 0 30px hsl(var(--cyan-hsl) / 0.3), 0 0 50px hsl(var(--pink-hsl) / 0.2)",
          },
        },
        lift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-4px)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.25" },
        },
        // Attention pulse for chat button - visible but smooth
        "attention-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.4",
          },
          "50%": {
            transform: "scale(1.15)",
            opacity: "0.7",
          },
        },
        // Calmer skeleton loading
        "skeleton-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",

        // Ambient cinematic motion (very slow, subtle)
        "glow-pulse": "glow-pulse 16s ease-in-out infinite",
        "glow-pulse-secondary": "glow-pulse-secondary 16s ease-in-out infinite",
        "border-glow": "border-glow 18s ease-in-out infinite",
        "border-glow-secondary": "border-glow-secondary 18s ease-in-out infinite",
        "border-glow-dual": "border-glow-dual 20s ease-in-out infinite",
        lift: "lift 0.2s ease-out forwards",
        "glow-breathe": "glow-breathe 18s ease-in-out infinite",
        "neon-flicker": "neon-flicker 2s linear infinite",
        "pulse-slow": "pulse-slow 16s ease-in-out infinite",

        // Attention animation for chat button (visible, controlled)
        "attention-pulse": "attention-pulse 4s ease-in-out infinite",

        // Calmer skeleton loading
        "skeleton-pulse": "skeleton-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
