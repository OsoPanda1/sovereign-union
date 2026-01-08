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
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
        // TAMV HYPERREAL GOLD SYSTEM
        gold: {
          DEFAULT: "hsl(45, 92%, 58%)",
          highlight: "hsl(50, 100%, 72%)",
          base: "hsl(45, 92%, 58%)",
          shadow: "hsl(38, 85%, 35%)",
          deep: "hsl(35, 80%, 22%)",
          muted: "hsla(45, 92%, 58%, 0.3)",
        },
        obsidian: {
          DEFAULT: "hsl(220, 15%, 3%)",
          light: "hsl(220, 15%, 8%)",
          surface: "hsl(220, 12%, 12%)",
        },
        turquoise: {
          DEFAULT: "hsl(168, 84%, 48%)",
          light: "hsl(168, 80%, 60%)",
          dark: "hsl(168, 85%, 35%)",
        },
        isabella: {
          DEFAULT: "hsl(168, 84%, 48%)",
          glow: "hsla(168, 84%, 48%, 0.4)",
        },
        anubis: {
          DEFAULT: "hsl(0, 72%, 51%)",
          glow: "hsla(0, 72%, 51%, 0.4)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
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
        "gold-shine": {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "gold-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsla(45, 92%, 58%, 0.4), 0 0 40px hsla(45, 92%, 58%, 0.2)",
          },
          "50%": { 
            boxShadow: "0 0 40px hsla(45, 92%, 58%, 0.6), 0 0 80px hsla(45, 92%, 58%, 0.3)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "chaos-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gold-shine": "gold-shine 4s ease-in-out infinite",
        "gold-flow": "gold-flow 6s ease infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "chaos-rotate": "chaos-rotate 20s linear infinite",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, hsl(50, 100%, 72%) 0%, hsl(45, 92%, 58%) 50%, hsl(38, 85%, 40%) 100%)",
        "gradient-gold-metallic": "linear-gradient(180deg, hsl(50, 100%, 75%) 0%, hsl(45, 95%, 55%) 40%, hsl(38, 85%, 40%) 100%)",
        "gradient-obsidian": "linear-gradient(180deg, hsl(220, 15%, 8%) 0%, hsl(220, 15%, 3%) 100%)",
        "gradient-sovereign": "linear-gradient(135deg, hsla(45, 92%, 58%, 0.15) 0%, hsla(168, 84%, 48%, 0.05) 100%)",
        "gradient-radial-gold": "radial-gradient(circle at center, hsla(45, 92%, 58%, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold": "0 0 30px hsla(45, 92%, 58%, 0.3)",
        "gold-lg": "0 0 60px hsla(45, 92%, 58%, 0.4)",
        "gold-3d": "0 4px 15px hsla(45, 92%, 58%, 0.3), 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.25)",
        "turquoise": "0 0 20px hsla(168, 84%, 48%, 0.3)",
        "sovereign": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 50px hsla(45, 92%, 58%, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
