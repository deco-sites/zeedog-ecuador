import plugin from "tailwindcss/plugin.js";
import daisyui from "daisyui";

export default {
  content: ["./**/*.{ts,tsx}", "./static/**/*.{css}"],
  theme: {
    fontFamily: {
      "futura": ["futura-pt", "ui-sans-serif", "system-ui", "sans-serif"],
      "roboto": ["roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      "times": ["Times New Roman", "ui-serif", "serif"],
    },
    colors: {
      black: "#121212",
      white: "#FFFFFF",
      gray: {
        700: "#353535",
        600: "#555555",
        500: "#666666",
        400: "#999999",
        300: "#C7C7C7",
        200: "#E2E2E2",
        100: "#F4F4F4",
      },
      red: {
        400: "#C33E46",
        300: "#FC4F63",
        200: "#FEC7CD",
      },
      yellow: {
        400: "#FDAB02",
        200: "#FEE4AE",
        100: "#FFF5E1",
      },
      blue: {
        400: "#009AFF",
        200: "#ADDFFF",
        100: "#E0F3FF",
      },
      green: {
        400: "#25D366",
        200: "#DAEBC5",
        100: "#F3F8EC",
      },
      "moss-green": {
        400: "#475B35",
        300: "#208778",
        100: "#D2E7E4",
      },
      sand: {
        400: "#E1D1B1",
        300: "#EDE2CD",
        200: "#F4EBD9",
        100: "#F8F5F1",
      },
      orange: {
        300: "#E28759",
      },
    },
    // fontSize: {
    //   "xs": "14px",
    //   "sm": "16px",
    //   "lg": "20px",
    //   "xl": "24px",
    //   "2xl": "32px",
    //   "3xl": "36px",
    //   "4xl": "40px",
    // },
    extend: {
      fontSize: {
        "3xs": "10px",
        "2xs": "12px",
        "xs": "14px",
        "sm": "16px",
        "md": "18px",
        "lg": "20px",
        "xl": "24px",
        "2xl": "32px",
        "3xl": "36px",
        "4xl": "40px",
        "4.5xl": "42px",
        "7.5xl": "80px",
      },
      spacing: {
        "0.5/10": "5%",
        "1/10": "10%",
        "4.5/5": "90%",
        "7.5": "30px",
      },
      backdropBlur: {
        "xxl": "30px",
      },
      screens: {
        "xs": "280px",
        "sm": "360px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "3xl": "1921px",
      },
      animation: {
        "smooth-slide": "smooth-slide 4s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "filterloading": "filterloading 1s linear",
        "fade-in-toast": "fade-in-toast 0.5s forwards",
        "fade-out-toast": "fade-out-toast 0.5s forwards",
        "pop-in": "popIn 0.5s ease-out",
      },
      keyframes: {
        "smooth-slide": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
          "95%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "filterloading": {
          "0%": {
            "border-color": "#121212",
            background: "#121212",
            transform: "translate(-4px, -4px)",
          },
          "20%": {
            transform: "translate(3px, -4px)",
          },
          "40%": {
            "border-color": "#666",
            background: "#666",
            transform: "translate(3px, 3px)",
          },
          "80%": {
            transform: "translate(-4px, 3px)",
          },
          "100%": {
            "border-color": "#121212",
            background: "#121212",
            transform: "translate(-4px, -4px)",
          },
        },
        "fade-in-toast": {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-out-toast": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-20px)" },
        },
        popIn: {
          "0%": { transform: "scale(0.2)", opacity: "0" },
          "60%": { transform: "scale(1.2)", opacity: "1" },
          "80%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      maxWidth: {
        "inherit": "inherit",
        "mxl": "1440px",
      },
      maxHeight: {
        "2xl": "42rem",
      },
      borderRadius: {
        "2.5xl": "20px",
      },
      boxShadow: {
        "toast": "0px 0px 8px 0px rgba(0, 0, 0, 0.13)",
        "bf": "0 0px 80px 0px",
        "tooltip-pix": "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
      },
      gridTemplateColumns: {
        "banner-and-carousel": "calc(50% - 20px) calc(50% + 20px)",
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("folded-header", "body.js-folded-header &");
      addVariant("is-kitchen", "body.js-is-kitchen &");
      addVariant("children", "& > *");
    }),
    daisyui,
  ],
  daisyui: { themes: [], logs: false, styled: false },
};
