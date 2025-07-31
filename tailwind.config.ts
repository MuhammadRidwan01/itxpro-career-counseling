import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [...defaultConfig.content, "./pages/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        // Premium gradient colors
        nude: {
          50: "#FDF8F3",
          100: "#F5E6D3",
          200: "#F0D4B8",
          300: "#E8B4CB",
          400: "#D4A5B8",
          500: "#C196A5",
          600: "#9A7AA0",
          700: "#8B6B91",
          800: "#6B5B73",
          900: "#4A3F52",
        },
        gold: {
          400: "#F4D03F",
          500: "#D4AF37",
          600: "#B8941F",
        },
        // Custom glassmorphism colors
        glass: {
          white: "rgba(255, 255, 255, 0.25)",
          nude: "rgba(245, 230, 211, 0.25)",
          dark: "rgba(107, 91, 115, 0.25)",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #F5E6D3 0%, #E8B4CB 25%, #9A7AA0 75%, #6B5B73 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "gradient-button": "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
