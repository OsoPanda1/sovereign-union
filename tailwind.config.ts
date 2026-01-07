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
        // TAMV Custom Colors
        obsidian: {
          DEFAULT: "#020202",
          light: "#0a0a0a",
          surface: "#111111",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C76B",
          dark: "#A68B2C",
          muted: "rgba(212, 175, 55, 0.3)",
        },
        turquoise: {
          DEFAULT: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#14B8A6",
        },
        isabella: {
          DEFAULT: "#2DD4BF",
          glow: "rgba(45, 212, 191, 0.4)",
        },
        anubis: {
          DEFAULT: "#EF4444",
          glow: "rgba(239, 68, 68, 0.4)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.5rem",
        "3xl": "2rem",
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
        "pulse-gold": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)",
            opacity: "0.8"
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
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "chaos-rotate": "chaos-rotate 20s linear infinite",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #A68B2C 100%)",
        "gradient-obsidian": "linear-gradient(180deg, #0a0a0a 0%, #020202 100%)",
        "gradient-sovereign": "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(45, 212, 191, 0.05) 100%)",
        "gradient-radial-gold": "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold": "0 0 30px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 0 60px rgba(212, 175, 55, 0.4)",
        "turquoise": "0 0 20px rgba(45, 212, 191, 0.3)",
        "sovereign": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
