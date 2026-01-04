import type { Config } from "tailwindcss";

export default {
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
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.5)" },
        },
        "glow-pulse-pink": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--secondary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--secondary) / 0.5)" },
        },
        "border-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(var(--primary) / 0.4), 0 0 20px hsl(var(--primary) / 0.2), 0 0 35px hsl(var(--primary) / 0.1), inset 0 0 10px hsl(var(--primary) / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.4), 0 0 50px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.15)" 
          },
        },
        "border-glow-pink": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(var(--secondary) / 0.4), 0 0 20px hsl(var(--secondary) / 0.2), 0 0 35px hsl(var(--secondary) / 0.1), inset 0 0 10px hsl(var(--secondary) / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(var(--secondary) / 0.6), 0 0 30px hsl(var(--secondary) / 0.4), 0 0 50px hsl(var(--secondary) / 0.2), inset 0 0 15px hsl(var(--secondary) / 0.15)" 
          },
        },
        "border-glow-dual": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(var(--primary) / 0.4), 0 0 20px hsl(var(--primary) / 0.2), 0 0 35px hsl(var(--secondary) / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(var(--secondary) / 0.5), 0 0 30px hsl(var(--secondary) / 0.3), 0 0 50px hsl(var(--primary) / 0.2)" 
          },
        },
        "lift": {
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",

        // Slower, more cinematic neon motion (less "busy")
        "glow-pulse": "glow-pulse 8s ease-in-out infinite",
        "glow-pulse-pink": "glow-pulse-pink 8s ease-in-out infinite",
        "border-glow": "border-glow 10s ease-in-out infinite",
        "border-glow-pink": "border-glow-pink 10s ease-in-out infinite",
        "border-glow-dual": "border-glow-dual 12s ease-in-out infinite",
        "lift": "lift 0.2s ease-out forwards",
        "glow-breathe": "glow-breathe 10s ease-in-out infinite",
        "neon-flicker": "neon-flicker 2s linear infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;